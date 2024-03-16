import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../_shared/schema/index.ts";
import { Light } from "../_shared/types/Light.ts";
import { lights } from "../_shared/schema/lights.ts";

const connectionString = Deno.env.get("DATABASE_URL")!;

export const light = async (id: number, req: Request) => {
  try {
    const input = Light.safeParse(await req.json());
    if (!input.success) return new Response(null, { status: 400 });

    const client = postgres(connectionString, { prepare: false });
    const db = drizzle(client, { schema });

    const result = await db.insert(lights)
      .values({ deviceId: id, light: input.data.intensity }).returning();

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
