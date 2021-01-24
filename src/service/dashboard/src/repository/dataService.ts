import { Dashboard } from "./dashboard.ts";

export const getDashboardByUserId = (userid: number): Promise<Dashboard> => {
	return Dashboard.where("userid", userid)
		.select("id")
		.first();
};

export const createDashboard = (
	userid: number
): Promise<Dashboard> => {
	return Dashboard.create({
		userid: userid
	});
};
