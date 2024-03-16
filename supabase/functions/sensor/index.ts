import { light } from "./light.ts";
import { waterLevel } from "./waterLevel.ts";
import { waterTemperature } from "./waterTemperature.ts";

Deno.serve(async (req) => {
  const { url, method } = req;

  try {
    if (method !== "POST") return new Response(null, { status: 405 });

    const taskPattern = new URLPattern({
      pathname: "/sensor/:id/:action/:type?",
    });
    const matchingPath = taskPattern.exec(url);
    if (!matchingPath) return new Response(null, { status: 400 });

    const idParam = matchingPath ? matchingPath.pathname.groups.id : null;
    if (!idParam) return new Response(null, { status: 400 });

    const id = +idParam;

    switch (matchingPath.pathname.groups.action) {
      case "light":
        return await light(id, req);
      case "water": {
        const type = matchingPath.pathname.groups.type;
        if (type === "level") return await waterLevel(id, req);
        else if (type === "temperature") return await waterTemperature(id, req);
        else return new Response(null, { status: 400 });
      }
    }
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
});
