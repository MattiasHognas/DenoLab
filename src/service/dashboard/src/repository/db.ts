import { Database, PostgresConnector } from "./../deps.ts";

export const createDatabaseConnection = () =>
	new Database(
		new PostgresConnector({
			database: "authentication",
			host: "127.0.0.1",
			username: "lab",
			password: "lab",
			port: 7002,
		})
	);
