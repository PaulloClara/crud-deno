import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export interface Context extends RouterContext {
  json?: any;
  token?: string;
}
