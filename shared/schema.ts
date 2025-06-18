import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  details: text("details").notNull(),
  price: text("price"),
  isActive: boolean("is_active").default(true),
});

export const businessInfo = pgTable("business_info", {
  id: serial("id").primaryKey(),
  mondayHours: text("monday_hours").notNull().default("09:00-17:00"),
  tuesdayHours: text("tuesday_hours").notNull().default("09:00-17:00"),
  wednesdayHours: text("wednesday_hours").notNull().default("09:00-17:00"),
  thursdayHours: text("thursday_hours").notNull().default("09:00-17:00"),
  fridayHours: text("friday_hours").notNull().default("09:00-17:00"),
  saturdayHours: text("saturday_hours").notNull().default("09:00-12:00"),
  sundayHours: text("sunday_hours").notNull().default("Fermé"),
  phone: text("phone").notNull().default("40 50 60 70"),
  email: text("email").notNull().default("contact@maitaibeauty.com"),
  address: text("address").notNull().default("PK18, Punaauia, Tahiti"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  image: true,
  details: true,
  price: true,
  isActive: true,
});

export const updateBusinessInfoSchema = createInsertSchema(businessInfo).pick({
  mondayHours: true,
  tuesdayHours: true,
  wednesdayHours: true,
  thursdayHours: true,
  fridayHours: true,
  saturdayHours: true,
  sundayHours: true,
  phone: true,
  email: true,
  address: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type BusinessInfo = typeof businessInfo.$inferSelect;
export type UpdateBusinessInfo = z.infer<typeof updateBusinessInfoSchema>;
