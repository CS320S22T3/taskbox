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
    .where("id", newTask["id"])
    // chain updates?
    .update("info_type", newTask["info_type"])
    .update("info_id", newTask["info_id"])
    .update("assigner_id", newTask["assigner_id"])
    .update("assignee_id", newTask["assignee_id"])
    .update("due_date", newTask["due_date"])
    .update("created_date", newTask["created_date"])
    .returning("id")
    .then(([{id}]) => { // not sure if this works, just copied from createTask (thanks Rohit)
      newTask['id'] = id;
      return newTask;
  })
    .catch((err) => {
      throw new Error("Failed to update existing Task " + err);
    })
}

// ask for more information on structure if body, if it includes special fields
export async function updateInfoTask(newTask: any) {
  const type = newTask["info_type"];
  switch(type) {
    case "performance_review_requests": //this only has an ID column
      return newTask
      //break;
    case "time_off_requests": // id, type, start_date, end_date, notes
      return await knex("time_off_requests")
        .where("id", newTask["info_id"])
        .update("type", newTask["type"])
        .update("start_date", newTask["start_date"])
        .update("end_date", newTask["end_date"])
        .update("notes", newTask["notes"])
        .returning("id")
        .then(([{id}]) => { // not sure if this works, just copied from createTask (thanks Rohit)
          newTask['id'] = id;
          return newTask;
        })
        .catch((err) => {
          throw new Error("Failed to update existing Task " + err);
        })
      //break;
    case "training_assignments": // this only has ID and link columns, is "link" in request body?
        return await knex("training_assignments")
          .where("id", newTask["info_id"])
          .update("link", newTask["link"])
          .returning("id")
          .then(([{id}]) => { // not sure if this works, just copied from createTask (thanks Rohit)
            newTask['id'] = id;
            return newTask;
          })
          .catch((err) => {
            throw new Error("Failed to update existing Task " + err);
          })
      //break;
  }
}

// functions for checking possibility of requests
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