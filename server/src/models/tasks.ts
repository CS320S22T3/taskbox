import knex from "../pool";

export async function createTask(newTask: any) {
    return await knex('tasks')
        .insert(newTask)
        .returning('id')
        .then(([{id}]) => {
            newTask['id'] = id;
            return newTask;
        })
        .catch((err) => {
            throw new Error('Failed to create new Task ' + err);
        })
}

// I have no idea if any of these work
export async function updateTask(newTask: any) {
  return await knex("tasks")
    .where("id", "=", newTask.id)
    // maybe update each field individually?
    .update(newTask, ["id", "info_type", "info_id", "assigner_id", "assignee_id", "due_date", "created_date"])
    .catch((err) => {
      throw new Error("Failed to update existing Task " + err);
    })
}

export async function updateInfoTask(newTask: any) {
  return await knex(newTask.info_type)
    .where("info_id",  "=",  "newTask.info_id")
    .update(newTask)
    .catch((err) => { 
      throw new Error("Failed to update existing Task " + err);
    })
}

export async function checkTaskID(id: number) {
  return knex("tasks").select("id").where("id", id).first();
}

export async function checkTaskType(type: string) {
  return knex.schema.hasTable(type);
}

export async function checkTaskTypeID(id:number, type: string) {
  if (await checkTaskType(type)) {
    return knex(type).select("id").where("id", id).first();
  }
  else {
    return false;
  }
}