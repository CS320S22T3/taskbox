import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}

export async function checkUserID(id: number) {
  return knex("users").select("email").where("id", id).first();
}