import knex from "../pool";
import { TaskInfoInput, TaskInput } from "types";

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

export async function createTask(
  taskData: TaskInput,
  taskInfoType: string,
  taskInfoData: TaskInfoInput
) {
  const newInfo = await knex(taskInfoType).insert(taskInfoData).returning("id");

  const info_id = newInfo[0].id;

  return await knex("tasks")
    .insert({ info_id, ...taskData })
    .returning("*")
}

export async function fetchTask(id: number) {
  return await knex("tasks").where({ id }).first();
}

export async function updateTask(
  id: number,
  taskData: TaskInput,
  taskInfoData: TaskInfoInput
) {
  const updatedTask = (
    await knex("tasks").where({ id }).update(taskData).returning("*")
  )[0];

  const updatedInfo = (
    await knex(updatedTask.info_type)
      .where({ id: updatedTask.info_id })
      .update(taskInfoData)
      .returning("*")
  )[0];

  return Object.assign(updatedTask, updatedInfo);
}
