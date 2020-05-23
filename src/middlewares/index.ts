import { RouterContext, Body } from "https://deno.land/x/oak/mod.ts";

export interface RouterContextJSON extends RouterContext {
  json: any;
}

export async function handleJSONMiddleware(
  context: RouterContextJSON,
  next: Function
): Promise<any> {
  const { value: json }: Body = await context.request.body({
    contentTypes: { json: [] }
  });
  context.json = json;

  await next();
}
