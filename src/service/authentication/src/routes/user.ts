import { Context, decode } from "./../deps.ts";
import * as dataService from "./../repository/dataService.ts";

export const user = async (ctx: Context) => {
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  const jwt = authorization!.split(" ")[1];
  const values = decode(jwt);
  const userId: unknown = values!.payload!.iss!;
  let user = await dataService.getUserById(userId as number);
  if (user) {
    ctx.response.status = 200;
    ctx.response.body = user;
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "User not found",
    };
  }
};
