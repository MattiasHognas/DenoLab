import key from "./../key.ts";
import { Context, decode } from "./../deps.ts";
import * as dataService from "./../repository/dataService.ts";

export const dashboard = async (ctx: Context) => {
	const headers: Headers = ctx.request.headers;
	const authorization = headers.get("Authorization");
	const jwt = authorization!.split(" ")[1];
	const values = decode(jwt);
	const userId: unknown = values!.payload!.iss!;
	let dashboard = await dataService.getDashboardByUserId(userId as number);
	if (!dashboard) {
		dashboard = await dataService.createDashboard(userId as number);
	}
	ctx.response.body = "Dashbaord id: " + dashboard.id;
};
