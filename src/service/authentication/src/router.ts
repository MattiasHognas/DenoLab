import { Router } from "./deps.ts";
import { auth } from "./routes/auth.ts";
import { guest } from "./routes/guest.ts";
import { login } from "./routes/login.ts";
import { register } from "./routes/register.ts";
import { authMiddleware } from "./authMiddleware.ts";

const router = new Router();

router
	.post("login", "/login", login)
	.post("register", "/register", register)
	.get("guest", "/guest", guest)
	.get("auth", "/auth", authMiddleware, auth); // Registering authMiddleware for /auth endpoint only

export { router };
