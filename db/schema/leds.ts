import {
    integer,
    pgTable,
    serial,
    smallint,
    timestamp,
  } from "drizzle-orm/pg-core";
  import { devices } from "./devices.ts";
  import { sql } from "drizzle-orm";
  
  export const trays = pgTable("trays", {
    id: serial("id").primaryKey(),
    deviceId: integer("device_id").references(() => devices.id, {
      onDelete: "cascade",
    }).notNull(),
    leds: smallint("leds"),
    createdAt: timestamp("created_at").default(
      sql`(now() AT TIME ZONE 'utc')`,
    ).notNull(),
  });
  