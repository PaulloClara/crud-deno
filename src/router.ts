import { Router } from "https://deno.land/x/oak/mod.ts";
import { Home } from "./controllers.ts";

const router = new Router();

router.get("/", Home.index);

export const routes = router.routes();
export default router;
