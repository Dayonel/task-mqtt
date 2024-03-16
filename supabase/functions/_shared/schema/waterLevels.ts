import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { devices } from "./devices.ts";

export const waterLevels = pgTable("water_levels", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  waterLevel: boolean("water_level"),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
