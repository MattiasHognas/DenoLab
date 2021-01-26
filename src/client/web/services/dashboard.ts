import authentication from 'authentication.ts';
import axios, { AxiosResponse } from "https://esm.sh/axios";
import { Dashboard } from "../contracts/dashboard.ts";

const API_URL = 'http://localhost:8002/';

const getDashboard = (): Promise<AxiosResponse<Dashboard>> =>
	axios.get<Dashboard>(`${API_URL}dashboard`, {
		headers: authentication.authHeader(),
	});

export default {
	getDashboard,
}
