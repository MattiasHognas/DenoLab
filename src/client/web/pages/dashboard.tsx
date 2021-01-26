import React from "https://esm.sh/react";
import { redirect } from "../deps.ts";
import authentication from "../services/authentication.ts";

export default function Dashboard() {
	if (!authentication.getCurrentUser()) {
		redirect('/', true)
	}
	return (
		<>
			The dashboard
		</>
	);
}
