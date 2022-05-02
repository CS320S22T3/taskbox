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

export async function updateTask(taskAttributes: any) {
  const { id, info_type, info_id, info_attributes, assigner_id, assignee_id, due_date, created_date } = taskAttributes; // extract id and k-specific fields
  const task = await knex('tasks').where({ id }).update({
    id: id,
    info_type: info_type,
    info_id: info_id,
    assigner_id: assigner_id,
    assignee_id: assignee_id,
    due_date: due_date,
    created_date: created_date
  }, "*"); // update the task
  task.info = await knex(task.info_type).where({ id: task.info_id }).update(info_attributes, "*"); // update the associated info
  return task;
}

// functions for checking possibility of requests
export async function doesUserExist(id: number) {
  const result = await knex("users").count("id").where({ id });
  return result.length > 0;
}

export async function doesTaskExist(id: number) {
  const result = await knex("tasks").count("id").where({ id });
  return result.length > 0;
}

/*
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
*/