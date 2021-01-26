import * as dataService from "./../repository/dataService.ts";
import { User } from "./../repository/user.ts";
import { Database, expect, SQLite3Connector } from "./../deps.ts";

const createDatabaseConnection = (connectionString: string) =>
  new Database(
    new SQLite3Connector({
      filepath: connectionString,
    }),
  );

const setup = async () => {
  const db = createDatabaseConnection(":memory:");
  db.link([User]);
  await db.sync({ drop: true });
  await User.create([
    {
      username: "testuser1username",
      password: "testuser1password",
      email: "testuser1email",
    },
    {
      username: "testuser2username",
      password: "testuser2password",
      email: "testuser2email",
    },
  ]);
  return db;
};

Deno.test("Verify that getUser return a valid user", async () => {
  const db = await setup();
  const user = await dataService.getUser(
    "testuser1username",
    "testuser1password",
  );
  await db.close();
  expect(user.id).toEqual(1);
});

Deno.test("Verify that getUser return null for an invalid user", async () => {
  const db = await setup();
  const user = await dataService.getUser(
    "testuser3username",
    "testuser3password",
  );
  await db.close();
  expect(user).toBeUndefined();
});

Deno.test("Verify that getUserByUserName return a valid user", async () => {
  const db = await setup();
  const user = await dataService.getUserByUserName("testuser2username");
  await db.close();
  expect(user.id).toEqual(2);
});

Deno.test(
  "Verify that getUserByUserName return null for an invalid user",
  async () => {
    const db = await setup();
    const user = await dataService.getUserByUserName("testuser3username");
    await db.close();
    expect(user).toBeUndefined();
  },
);

Deno.test("Verify that getUserById return a valid user", async () => {
  const db = await setup();
  const user = await dataService.getUserById(2);
  await db.close();
  expect(user.username).toEqual("testuser2username");
});

Deno.test(
  "Verify that getUserById return null for an invalid user",
  async () => {
    const db = await setup();
    const user = await dataService.getUserById(999);
    await db.close();
    expect(user).toBeUndefined();
  },
);

Deno.test("Verify that createUser return a valid user", async () => {
  const db = await setup();
  const user = await dataService.createUser(
    "testuser3username",
    "testuser3password",
    "testuser3email",
  );
  await db.close();
  expect(user.id).toEqual(3);
});
