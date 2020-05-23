import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export class HomeController {
  static index({ response }: RouterContext): void {
    response.body = "Hello World!";
  }
}
