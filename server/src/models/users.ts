import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}

export async function checkUserID(id: number) {

  return knex("users")
  .select("id")
  .where("id", id)
  .then(rows => rows.length>0)
}