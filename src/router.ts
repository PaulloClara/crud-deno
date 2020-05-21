import { Router } from "https://deno.land/x/oak/mod.ts";
import { Home, User } from "./controllers.ts";

const router = new Router();

router.get("/", Home.index);
router.get("/users", User.index);

export const routes = router.routes();
export default router;
