import { Application } from "https://deno.land/x/oak/mod.ts";
import { routes } from "./router.ts";

const server = new Application();

server.use(routes);

const opts = { port: 3000 };

server.listen(opts);
console.log(`\n\n\tServer running on http://localhost:${opts.port}`);
