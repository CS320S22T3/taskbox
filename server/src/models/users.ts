import knex from "../pool";

export async function getUserFromEmail(email: string) {
  return await knex("users").where({ email }).first();
}

export async function assertUserWithId(id: number) {
  return (await knex("users").select().where("id", id)).length > 0;
}
