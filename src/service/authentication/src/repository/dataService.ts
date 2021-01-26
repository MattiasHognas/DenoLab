import { User } from "./user.ts";

export const getUser = (username: string, password: string): Promise<User> => {
  return User.where("username", username)
    .where("password", password)
    .select("username", "id")
    .first();
};

export const getUserByUserName = (username: string): Promise<User> => {
  return User.where("username", username).select("username", "id").first();
};

export const getUserById = (id: number): Promise<User> => {
  return User.where("id", id).select("username", "id").first();
};

export const createUser = (
  username: string,
  password: string,
  email: string,
): Promise<User> => {
  return User.create({
    username: username,
    password: password,
    email: email,
  });
};
