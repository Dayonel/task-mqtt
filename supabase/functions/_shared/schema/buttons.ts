import {
  integer,
  jsonb,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { devices } from "./devices.ts";
import { sql } from "drizzle-orm";

export const buttons = pgTable("buttons", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  buttons: jsonb("buttons"),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
