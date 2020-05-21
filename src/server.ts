import { Application } from "https://deno.land/x/oak/mod.ts";

const server = new Application();

server.use(ctx => {
  ctx.response.body = "Hello World!";
});

const opts = { port: 3000 };

server.listen(opts);
console.log(`\n\n\tServer running on http://localhost:${opts.port}`);
