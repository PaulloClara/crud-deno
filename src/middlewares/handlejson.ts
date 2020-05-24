import { Context } from "../router/utils.ts";
import { Body } from "https://deno.land/x/oak/mod.ts";

export async function handleJSONMiddleware(
  context: Context,
  next: Function
): Promise<any> {
  const { value: json }: Body = await context.request.body({
    contentTypes: { json: [] }
  });
  context.json = json;

  await next();
}
