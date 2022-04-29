import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}

export async function checkUserID(id: number) {

  const rows = await knex("users")
  .select("id")
  .where("id", id);
  
  return rows.length > 0;
}