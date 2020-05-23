import { Router } from "https://deno.land/x/oak/mod.ts";

import { HomeController } from "./controllers/home.ts";
import { UserController } from "./controllers/user.ts";

const router = new Router();

router.get("/", HomeController.index);
router.get("/users", UserController.index);
router.post("/users", UserController.store);

export const routes = router.routes();
export default router;
