import {
    boolean,
    integer,
    pgTable,
    serial,
    timestamp,
  } from "drizzle-orm/pg-core";
  import { devices } from "./devices.ts";
  import { sql } from "drizzle-orm";
  
  export const fans = pgTable("fans", {
    id: serial("id").primaryKey(),
    deviceId: integer("device_id").references(() => devices.id, {
      onDelete: "cascade",
    }).notNull(),
    fans: boolean("fans").array(),
    createdAt: timestamp("created_at").default(
      sql`(now() AT TIME ZONE 'utc')`,
    ).notNull(),
  });
  