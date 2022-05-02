import knex from "../pool";

interface Task {
  info_type: string;
  info_id: number;
  assigner_id: number;
  assignee_id: number;
  due_date: Date;
  created_date: Date;
  info: any;
}

export async function createTask(newTask: Task) {
  const newInfo = await knex(newTask["info_type"])
    .insert(newTask.info)
    .returning("id");

  const info_id = newInfo[0].id;

  const { info, ...taskInfo } = newTask;

  return await knex("tasks")
    .insert({ ...taskInfo, info_id })
    .returning("*");
}

export async function getAssociatedTasksForUser(id: number) {
  return await knex("tasks")
    .where("assignee_id", "=", id)
    .orWhere("assigner_id", "=", id)
    .leftJoin(
      "training_assignments",
      "tasks.info_id",
      "training_assignments.id"
    )
    .leftJoin("time_off_requests", "tasks.info_id", "time_off_request.id")
    .leftJoin(
      "performance_review_requests",
      "tasks.info_id",
      "performance_review_requests.id"
    );
}
export async function createTask(newTask: any) {
  return await knex("tasks")
    .insert(newTask)
    .returning("id")
    .then(([{ id }]) => {
      newTask["id"] = id;
      return newTask;
    })
    .catch((err) => {
      throw new Error("Failed to create new Task " + err);
    });
}

export async function updateTask(taskAttributes: any) {
  const {
    id,
    info_type,
    info_id,
    info_attributes,
    assigner_id,
    assignee_id,
    due_date,
    created_date,
  } = taskAttributes; // extract id and k-specific fields
  const task = await knex("tasks").where({ id }).update(
    {
      info_type,
      info_id,
      assigner_id,
      assignee_id,
      due_date,
      created_date,
    },
    "*"
  ); // update the task
  task[0].info = await knex(task[0].info_type)
    .where({ id: task[0].info_id })
    .update(info_attributes, "*"); // update the associated info
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
