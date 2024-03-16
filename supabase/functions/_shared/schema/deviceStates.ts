import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  smallint,
  timestamp,
} from "drizzle-orm/pg-core";
import { devices } from "./index.ts";
import { sql } from "drizzle-orm";

export const deviceStates = pgTable("device_states", {
  id: serial("id").primaryKey(),
  deviceId: integer("device_id").references(() => devices.id, {
    onDelete: "cascade",
  }).notNull(),
  buttons: jsonb("buttons"),
  trays: jsonb("trays"),
  leds: smallint("leds"),
  fans: boolean("fans").array(),
  createdAt: timestamp("created_at").default(
    sql`(now() AT TIME ZONE 'utc')`,
  ).notNull(),
});
