import { Context } from "./../deps.ts";

export const guest = (ctx: Context) => {
	ctx.response.body = "Guest success";
};
