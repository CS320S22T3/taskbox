import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}

export async function checkUserID(id: number) {
  console.log(knex("users").select("*").where({id}));
  // return knex("users").whereExists(knex.select(*).from()))
}