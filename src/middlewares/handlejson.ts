import { Context } from "../router.ts";
import { Body, BodyOptions } from "https://deno.land/x/oak/mod.ts";

export default async function(context: Context, next: Function): Promise<void> {
  try {
    const options: BodyOptions = { contentTypes: { json: [] } };
    const { value }: Body = await context.request.body(options);

    context.json = value;

    await next();
  } catch (error) {
    console.error(error);
  }
}
