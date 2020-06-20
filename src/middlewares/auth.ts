import { Context } from "../router.ts";
import { validateJWT } from "../services/jwt.ts";

export default async function(context: Context, next: Function): Promise<void> {
  try {
    const auth = context.request.headers.get("authorization") || "";
    const token = auth.replace("Bearer ", "");

    const { header } = (await validateJWT(token)) || {};
    context.request.headers.set("id", header.app.id);

    await next();
  } catch (error) {
    console.error(error);
  }
}
