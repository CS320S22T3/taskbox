import knex from "../pool";

interface Task {
  info_type: string,
  info_id: number,
  assigner_id: number,
  assignee_id: number,
  due_date: Date,
  created_date: Date,
  info: any
}

export async function createTask(newTask: Task) {
  const newInfo = await knex(newTask["info_type"])
  .insert(newTask.info)
  .returning("id");

  const info_id = newInfo[0].id;
  
  const {info, ...taskInfo} = newTask;
  
  return await knex("tasks")
  .insert({...taskInfo, info_id})
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