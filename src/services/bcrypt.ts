import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export async function hashPassword(password: string): Promise<any> {
  return bcrypt.hash(password);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<any> {
  return bcrypt.compare(password, hash);
}
