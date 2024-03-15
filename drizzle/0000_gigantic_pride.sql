-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "mqtt";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('expired', 'invalid', 'valid', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('verified', 'unverified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('webauthn', 'totp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal3', 'aal2', 'aal1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('plain', 's256');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mqtt"."devices" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mqtt"."device_sensors" (
	"id" bigint PRIMARY KEY NOT NULL,
	"device_id" bigint NOT NULL,
	"light" bigint,
	"water_level" boolean,
	"water_temperature" real,
	"temperature" real[],
	"created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mqtt"."device_states" (
	"id" bigint PRIMARY KEY NOT NULL,
	"device_id" bigint NOT NULL,
	"buttons" jsonb,
	"trays" jsonb,
	"leds" smallint,
	"fans" boolean[],
	"created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mqtt"."device_sensors" ADD CONSTRAINT "mqtt_sensors_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "mqtt"."devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mqtt"."device_states" ADD CONSTRAINT "mqtt_device_states_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "mqtt"."devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/