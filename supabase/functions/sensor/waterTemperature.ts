import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../_shared/schema/index.ts";
import { WaterTemperature } from "../_shared/types/WaterTemperature.ts";
import { waterTemperatures } from "../_shared/schema/waterTemperatures.ts";

const connectionString = Deno.env.get("SUPABASE_DB_URL")!;

export const waterTemperature = async (id: number, req: Request) => {
  try {
    const input = WaterTemperature.safeParse(await req.json());
    if (!input.success) return new Response(null, { status: 400 });

    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client, { schema });

    const result = await db.insert(waterTemperatures)
      .values({ deviceId: id, waterTemperature: input.data.temperature })
      .returning();

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
