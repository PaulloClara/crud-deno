import { Router } from "https://deno.land/x/oak/mod.ts";
import { HomeController, UserController } from "./controllers.ts";

const router = new Router();

router.get("/", HomeController.index);
router.get("/users", UserController.index);
router.post("/users", UserController.store);

export const routes = router.routes();
export default router;
