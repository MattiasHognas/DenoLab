import Logo from "components/logo.tsx";
import { Head, Import } from "deps.ts";
import React, { ComponentType } from "https://esm.sh/react";

export default function App(
	{ Page, pageProps }: { Page: ComponentType<any>; pageProps: any },
) {
	// useEffect(() => {
	// 	if (authentication.getCurrentUser()) {
	// 		redirect('/dashboard', true)
	// 	}
	// })
	// TODO: Fix auto-routing and lionks on authenticated
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Lab</title>
			</Head>
			<div className="page">
				<Import from="../style/index.less" />
				<p className="logo"><Logo /></p>
				<p>
					<a href="/dashboard">Dashboard</a>
					<a href="/login">Login</a>
					<a href="/register">Register</a>
				</p>
				<Page {...pageProps} />
			</div>
		</>
	);
}
