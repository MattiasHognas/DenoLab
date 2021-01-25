import React, { ComponentType } from "https://esm.sh/react";
import { Head } from "https://deno.land/x/aleph@v0.2.28/mod.ts";

export default function App({
	Page,
	pageProps,
}: {
	Page: ComponentType<any>;
	pageProps: any;
}) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Hello World - Aleph.js</title>
			</Head>
			<Page {...pageProps} />
		</>
	);
}
