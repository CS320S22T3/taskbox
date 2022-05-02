import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return await knex("users").where({ email }).first();
}

export async function checkUserID(userId: number) {
  return await knex("users").select("email").where("id", userId).first();
}
