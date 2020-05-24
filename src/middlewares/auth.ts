import { Context } from "../router/utils.ts";
import { validateJWT } from "../services/jwt.ts";

export async function authMiddleware(
  context: Context,
  next: Function
): Promise<any> {
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
