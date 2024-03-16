import { light } from "./light.ts";

Deno.serve(async (req) => {
  const { url, method } = req;

  try {
    if (method !== "POST") return new Response(null, { status: 405 });

    const taskPattern = new URLPattern({ pathname: "/sensor/:id/:action" });
    const matchingPath = taskPattern.exec(url);
    if (!matchingPath) return new Response(null, { status: 400 });

    const idParam = matchingPath ? matchingPath.pathname.groups.id : null;
    if (!idParam) return new Response(null, { status: 400 });

    const id = +idParam;
    const json = await req.json();

    switch (matchingPath.pathname.groups.action) {
      case "light": {
        return await light(id, json);
      }
    }
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
});
