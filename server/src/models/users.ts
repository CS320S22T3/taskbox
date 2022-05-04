import knex from "../pool";

export async function getUsers() {
  return knex("users")
    .select("*")
    .leftJoin("user_informations", "users.id", "user_informations.user_id");
}

export async function getUserFromEmail(email: string) {
  return knex("users").where({ email }).first();
}
