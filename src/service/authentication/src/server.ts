import { Application } from "./deps.ts";
import { router } from "./router.ts";
import { createDatabaseConnection } from "./repository/db.ts";
import { User } from "./repository/user.ts";

createDatabaseConnection().link([User]);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8001 });
console.log("Started on port: 8001");
