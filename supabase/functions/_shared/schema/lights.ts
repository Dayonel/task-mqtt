import { sql } from "drizzle-orm";
import { integer, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { devices } from "./devices.ts";

export const lights = pgTable("lights", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  light: integer("light"),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
