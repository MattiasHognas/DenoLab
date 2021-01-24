import { Application } from "./deps.ts";
import { router } from "./router.ts";
import { createDatabaseConnection } from "./repository/db.ts";
import { Dashboard } from "./repository/dashboard.ts";

createDatabaseConnection().link([Dashboard]);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8002 });
console.log("Started on port: 8002");
