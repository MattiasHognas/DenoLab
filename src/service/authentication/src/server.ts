import { Application, log } from "./deps.ts";
import { router } from "./router.ts";
import { createDatabaseConnection } from "./repository/db.ts";
import { User } from "./repository/user.ts";

const db = createDatabaseConnection()
db.link([User])
db.sync();

const port: number = 8001;
const app: Application = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: port });
log.info(`Started on port: ${port}`);
