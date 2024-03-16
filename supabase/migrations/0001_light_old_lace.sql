CREATE TABLE IF NOT EXISTS "buttons" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"buttons" jsonb,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fans" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"fans" boolean[],
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trays" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"trays" jsonb,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lights" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"light" integer,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "temperatures" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"temperature" real[],
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "water_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"water_level" boolean,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "water_temperatures" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"water_temperature" real,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
DROP TABLE "device_sensors";--> statement-breakpoint
DROP TABLE "device_states";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buttons" ADD CONSTRAINT "buttons_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fans" ADD CONSTRAINT "fans_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trays" ADD CONSTRAINT "trays_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lights" ADD CONSTRAINT "lights_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "temperatures" ADD CONSTRAINT "temperatures_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "water_levels" ADD CONSTRAINT "water_levels_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "water_temperatures" ADD CONSTRAINT "water_temperatures_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
