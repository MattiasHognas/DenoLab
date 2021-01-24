import { Router } from "./deps.ts";
import { dashboard } from "./routes/dashboard.ts";
import { authMiddleware } from "./authMiddleware.ts";

const router = new Router();

router
	.post("login", "/dashboard", authMiddleware, dashboard)

export { router };
