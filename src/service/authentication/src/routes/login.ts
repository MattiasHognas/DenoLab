import { Context, create, Header, Payload } from "./../deps.ts";
import key from "./../key.ts";
import * as dataService from "./../repository/dataService.ts";

const header: Header = {
	alg: "HS256",
	typ: "JWT",
};

export const login = async (ctx: Context) => {
	const { username, password } = await ctx.request.body().value;
	const user = await dataService.getUser(username, password);
	if (user) {
		const payload: Payload = {
			iss: user.id as string,
			exp: Date.now() + 60000,
		};
		// Create JWT and send it to user
		const jwt = create(header, payload, key);
		if (jwt) {
			ctx.response.status = 200;
			ctx.response.body = {
				id: user.id as number,
				username: user.username as string,
				jwt,
			};
		} else {
			ctx.response.status = 500;
			ctx.response.body = {
				message: "Internal server error",
			};
		}
		return;
	}
	ctx.response.status = 422;
	ctx.response.body = {
		message: "Invalid username or password",
	};
};
