import { sql } from "drizzle-orm";
import { integer, pgTable, real, serial, timestamp } from "drizzle-orm/pg-core";
import { devices } from "./devices.ts";

export const waterTemperatures = pgTable("water_temperatures", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  waterTemperature: real("water_temperature"),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
