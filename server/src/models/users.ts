import knex from "../pool";

export const Users = knex("users");

export async function getUserFromEmail(email: string) {
  return await Users.first().where({ email });
}
