import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertServiceSchema, updateBusinessInfoSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import { promises as fs } from "fs";

// Simple session storage for admin authentication
const adminSessions = new Set<string>();

// Configure multer for image uploads
const storage_config = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'client/public/uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error as Error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_config,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to check admin authentication
const requireAuth = (req: any, res: any, next: any) => {
  const sessionId = req.headers['x-session-id'];
  if (!sessionId || !adminSessions.has(sessionId)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { password } = req.body;
      
      // Simple password check
      if (password === 'maitai2025') {
        const sessionId = Math.random().toString(36).substr(2, 9);
        adminSessions.add(sessionId);
        res.json({ sessionId });
      } else {
        res.status(401).json({ error: 'Invalid password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  });

  // Admin logout
  app.post('/api/admin/logout', (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionId) {
      adminSessions.delete(sessionId as string);
    }
    res.json({ success: true });
  });

  // Upload image (admin)
  app.post('/api/admin/upload', requireAuth, upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }
      
      const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  // Get all services (public)
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  });

  // Get single service (admin)
  app.get('/api/admin/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch service' });
    }
  });

  // Create service (admin)
  app.post('/api/admin/services', requireAuth, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: 'Invalid service data' });
    }
  });

  // Update service (admin)
  app.put('/api/admin/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(id, validatedData);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: 'Invalid service data' });
    }
  });

  // Delete service (admin)
  app.delete('/api/admin/services/:id', requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteService(id);
      if (!success) {
        return res.status(404).json({ error: 'Service not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service' });
    }
  });

  // Get business info (public)
  app.get('/api/business-info', async (req, res) => {
    try {
      const info = await storage.getBusinessInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch business info' });
    }
  });

  // Check admin session validity
  app.get('/api/admin/check', requireAuth, (req, res) => {
    res.json({ valid: true });
  });

  // Update business info (admin)
  app.put('/api/admin/business-info', requireAuth, async (req, res) => {
    try {
      const validatedData = updateBusinessInfoSchema.parse(req.body);
      const info = await storage.updateBusinessInfo(validatedData);
      res.json(info);
    } catch (error) {
      res.status(400).json({ error: 'Invalid business info data' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
