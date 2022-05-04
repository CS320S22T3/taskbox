import knex from "../pool";

export async function getUsers() {
  return knex("users")
    .select(["users.id", "first_name", "last_name"])
    .leftJoin("user_informations", "users.id", "user_informations.user_id");
}

export async function getUserFromEmail(email: string) {
  return knex("users")
    .select("*")
    .where("email", email)
    .leftJoin("user_informations", "users.id", "user_informations.user_id")
    .first();
}

export async function getUserFromId(user_id: number) {
  return knex("users")
    .select("*")
    .where("id", user_id)
    .leftJoin("user_informations", "users.id", "user_informations.user_id")
    .first();
}
