import { Context } from "./../deps.ts";
import * as dataService from "./../repository/dataService.ts";

export const register = async (ctx: Context) => {
	const { username, password, email } = await ctx.request.body().value;
	const user = await dataService.getUserByUserName(username);
	if (!user) {
		const success = await dataService.createUser(username, password, email);
		if (success) {
			ctx.response.status = 200;
			return;
		}
		ctx.response.status = 422;
		ctx.response.body = {
			message: "Unable to create user",
		};
	}
	ctx.response.status = 422;
	ctx.response.body = {
		message: "Invalid username or password",
	};
};
