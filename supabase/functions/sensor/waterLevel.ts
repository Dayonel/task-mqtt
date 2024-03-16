import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { deviceSensors } from "../_shared/schema/deviceSensors.ts";
import * as schema from "../_shared/schema/index.ts";
import { WaterLevel } from "../_shared/types/WaterLevel.ts";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;

export const waterLevel = async (id: number, req: Request) => {
  try {
    const input = WaterLevel.safeParse(await req.json());
    if (!input.success) return new Response(null, { status: 400 });

    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client, { schema });

    const result = await db.insert(deviceSensors)
      .values({ deviceId: id, waterLevel: input.data.level }).returning();

    return result
      ? new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      })
      : new Response(null, { status: 404 });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
};
