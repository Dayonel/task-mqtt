import { pgTable, pgSchema, pgEnum, bigint, text, timestamp, foreignKey, boolean, real, jsonb, smallint } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])

export const mqtt = pgSchema("mqtt");

export const devices = mqtt.table("devices", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default((now() AT TIME ZONE 'utc'::text)).notNull(),
});

export const deviceSensors = mqtt.table("device_sensors", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	deviceId: bigint("device_id", { mode: "number" }).notNull().references(() => devices.id, { onDelete: "cascade" } ),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	light: bigint("light", { mode: "number" }),
	waterLevel: boolean("water_level"),
	waterTemperature: real("water_temperature"),
	temperature: real("temperature").array(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default((now() AT TIME ZONE 'utc'::text)),
});

export const deviceStates = mqtt.table("device_states", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	deviceId: bigint("device_id", { mode: "number" }).notNull().references(() => devices.id, { onDelete: "cascade" } ),
	buttons: jsonb("buttons"),
	trays: jsonb("trays"),
	leds: smallint("leds"),
	fans: boolean("fans").array(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default((now() AT TIME ZONE 'utc'::text)),
});