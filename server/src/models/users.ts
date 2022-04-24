import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}

export async function checkUserID(id: number) {
  // console.log(id)
  return knex("users").select("email").where("id", id).first();
  // return knex("users").whereExists(knex.select(*).from()))
}