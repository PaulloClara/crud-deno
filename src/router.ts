import { Router } from "https://deno.land/x/oak/mod.ts";

import { HomeController } from "./controllers/home.ts";
import { UserController } from "./controllers/user.ts";

import { handleJSONMiddleware } from "./middlewares/index.ts";

const router = new Router();

router.get("/", HomeController.index);

router.get("/users", UserController.index);
router.post("/users", handleJSONMiddleware, UserController.store);
router.put("/users/:id", handleJSONMiddleware, UserController.update);
router.delete("/users/:id", UserController.destroy);

export const routes = router.routes();
export default router;
