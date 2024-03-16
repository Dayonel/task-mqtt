CREATE TABLE IF NOT EXISTS "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_sensors" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"light" integer,
	"temperature" real[],
	"water_level" boolean,
	"water_temperature" real,
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "device_states" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"buttons" jsonb,
	"trays" jsonb,
	"leds" smallint,
	"fans" boolean[],
	"created_at" timestamp DEFAULT (now() AT TIME ZONE 'utc') NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_sensors" ADD CONSTRAINT "device_sensors_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "device_states" ADD CONSTRAINT "device_states_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
