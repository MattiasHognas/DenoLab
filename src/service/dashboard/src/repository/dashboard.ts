import { DataTypes, Model } from "./../deps.ts";

export class Dashboard extends Model {
	static table = "dashboard";
	static timestamps = true;

	static fields = {
		id: { primaryKey: true, autoIncrement: true },
		userid: DataTypes.INTEGER,
	};
}
