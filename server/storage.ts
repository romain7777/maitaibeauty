import { users, services, businessInfo, type User, type InsertUser, type Service, type InsertService, type BusinessInfo, type UpdateBusinessInfo } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  getBusinessInfo(): Promise<BusinessInfo | undefined>;
  updateBusinessInfo(info: UpdateBusinessInfo): Promise<BusinessInfo>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db
      .insert(services)
      .values(insertService)
      .returning();
    return service;
  }

  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set(updateData)
      .where(eq(services.id, id))
      .returning();
    return service || undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db
      .update(services)
      .set({ isActive: false })
      .where(eq(services.id, id));
    return (result.rowCount || 0) > 0;
  }

  async getBusinessInfo(): Promise<BusinessInfo | undefined> {
    const [info] = await db.select().from(businessInfo).limit(1);
    return info || undefined;
  }

  async updateBusinessInfo(updateData: UpdateBusinessInfo): Promise<BusinessInfo> {
    // Check if business info exists
    const existing = await this.getBusinessInfo();
    
    if (existing) {
      // Update existing record
      const [updated] = await db
        .update(businessInfo)
        .set(updateData)
        .where(eq(businessInfo.id, existing.id))
        .returning();
      return updated;
    } else {
      // Create new record
      const [created] = await db
        .insert(businessInfo)
        .values(updateData)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();
