import { Router, RouterContext } from "https://deno.land/x/oak/mod.ts";

import { HomeController } from "./controllers/home.ts";
import { UserController, SessionController } from "./controllers/user.ts";

import authMiddleware from "./middlewares/auth.ts";
import handleJSONMiddleware from "./middlewares/handlejson.ts";

export interface Context extends RouterContext {
  json?: any;
  token?: string;
}

const router = new Router();

router.get("/", HomeController.index);

router.get("/users", UserController.index);
router.post("/users", handleJSONMiddleware, UserController.store);
router.put(
  "/users",
  authMiddleware,
  handleJSONMiddleware,
  UserController.update
);
router.delete("/users", authMiddleware, UserController.destroy);

router.post("/sessions/:id", handleJSONMiddleware, SessionController.store);

export const routes = router.routes();
export default router;
