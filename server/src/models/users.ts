import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}
