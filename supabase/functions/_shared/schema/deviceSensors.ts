import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { devices } from "./index.ts";

export const deviceSensors = pgTable("device_sensors", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  light: integer("light"),
  temperature: real("temperature").array(),
  waterLevel: boolean("water_level"),
  waterTemperature: real("water_temperature"),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
