import knex from "../pool";

export async function createTask(newTask: any) {

  const newInfo = await knex(newTask['info_type'])
  .insert(newTask.info)
  .returning("id");

  const info_id = newInfo[0].id;

  const {info, ...taskInfo} = newTask;
  
  return await knex("tasks")
    .insert({...taskInfo, info_id})
    .returning("id");
}
