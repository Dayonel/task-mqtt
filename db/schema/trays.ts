import {
    integer,
    jsonb,
    pgTable,
    serial,
    timestamp,
  } from "drizzle-orm/pg-core";
  import { devices } from "./devices.ts";
  import { sql } from "drizzle-orm";
  
  export const trays = pgTable("trays", {
    id: serial("id").primaryKey(),
    deviceId: integer("device_id").references(() => devices.id, {
      onDelete: "cascade",
    }).notNull(),
    trays: jsonb("trays"),
    createdAt: timestamp("created_at").default(
      sql`(now() AT TIME ZONE 'utc')`,
    ).notNull(),
  });
  