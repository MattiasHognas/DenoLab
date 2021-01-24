import key from "./key.ts";
import { Context, verify } from "./deps.ts";

export const authMiddleware = async (
	ctx: Context,
	next: () => Promise<unknown>
) => {
	const headers: Headers = ctx.request.headers;
	const authorization = headers.get("Authorization");
	if (!authorization) {
		ctx.response.status = 401;
		return;
	}
	const jwt = authorization.split(" ")[1];
	if (!jwt) {
		ctx.response.status = 401;
		return;
	}
	if (await verify(jwt, key, "HS256")) {
		await next();
		return;
	}

	ctx.response.status = 401;
	ctx.response.body = { message: "Invalid jwt token" };
};
