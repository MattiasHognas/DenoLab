import { Router } from "./deps.ts";
import { dashboard } from "./routes/dashboard.ts";
import { authMiddleware } from "./authMiddleware.ts";

const router = new Router();

router
	.get("dashboard", "/dashboard", authMiddleware, dashboard)

export { router };
