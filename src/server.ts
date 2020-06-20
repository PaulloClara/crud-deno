import { Application, ListenOptions } from "https://deno.land/x/oak/mod.ts";
import { routes } from "./router.ts";

const server: Application = new Application();
const options: ListenOptions = { port: 3000 };

server.use(routes);

server.listen(options);
console.log(`\n\n\tServer running on http://localhost:${options.port}`);
