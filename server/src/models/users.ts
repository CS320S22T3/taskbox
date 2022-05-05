import knex from "../pool";

export async function getUsers() {
  return await knex("users")
    .select("*")
    .leftJoin("user_informations as ui", "ui.user_id", "users.id");
}

export async function getUserFromEmail(email: string) {
  return await knex("users")
    .leftJoin("user_informations as ui", "ui.user_id", "users.id")
    .select("*")
    .where("email", email)
    .first();
}

export async function getUserFromId(user_id: number) {
  return await knex("users")
    .select("*")
    .where("users.id", user_id)
    .leftJoin("user_informations as ui", "ui.user_id", "users.id")
    .first();
}
