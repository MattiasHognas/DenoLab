import { Context } from "./../deps.ts";

export const auth = (ctx: Context) => {
	ctx.response.body = "Auth success";
};
