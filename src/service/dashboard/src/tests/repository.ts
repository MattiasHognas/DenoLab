import * as dataService from "./../repository/dataService.ts";
import { Dashboard } from "./../repository/dashboard.ts";
import { expect, Database, SQLite3Connector } from "./../deps.ts";

const createDatabaseConnection = (connectionString: string) =>
	new Database(
		new SQLite3Connector({
			filepath: connectionString,
		})
	);

const setup = async () => {
	const db = createDatabaseConnection(":memory:");
	db.link([Dashboard]);
	await db.sync({ drop: true });
	await Dashboard.create([
		{
			userid: 111,
		},
		{
			userid: 222,
		},
	]);
	return db;
};

Deno.test("Verify that getDashboardByUserId return a valid dashboard", async () => {
	const db = await setup();
	const dashboard = await dataService.getDashboardByUserId(
		111
	);
	await db.close();
	expect(dashboard.id).toEqual(1);
});

Deno.test("Verify that getDashboardByUserId return null for an invalid dashboard", async () => {
	const db = await setup();
	const dashboard = await dataService.getDashboardByUserId(
		999,
	);
	await db.close();
	expect(dashboard).toBeUndefined();
});

Deno.test("Verify that createDashboard return a valid dashboard", async () => {
	const db = await setup();
	const dashboard = await dataService.createDashboard(
		333,
	);
	await db.close();
	expect(dashboard.id).toEqual(3);
});
