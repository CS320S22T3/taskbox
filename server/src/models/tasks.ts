import knex from "../pool";
import { TaskInfoInput, TaskInput } from "types";

export async function getAssociatedTasksForUser(id: number) {
  const associatedTasks = await knex("tasks")
    .where("assignee_id", "=", id)
    .orWhere("assigner_id", "=", id);

  const associatedTaskIds = associatedTasks.map((row) => row.id);
  const info = new Map<number, Record<string, unknown>>();
  for (const table of [
    "training_assignments",
    "time_off_requests",
    "performance_review_requests",
  ])
    for (const row of await knex(table).whereIn("id", associatedTaskIds))
      info.set(row.id, row);

  return associatedTasks.map((task) => ({
    ...task,
    info: info.get(task.info_id),
  }));
}

export async function createTask(
  taskData: TaskInput,
  taskInfoType: string,
  taskInfoData: TaskInfoInput
) {
  return await knex.transaction(async (trx) => {
    const info = (
      await trx(taskInfoType).insert(taskInfoData).returning("*")
    )[0];

    const task = (
      await trx("tasks")
        .insert({
          info_id: info.id,
          created_date: new Date(),
          info_type: taskInfoType,
          ...taskData,
        })
        .returning("*")
    )[0];

    return { ...task, info: info };
  });
}

export async function fetchTask(id: number) {
  return await knex("tasks").where({ id }).first();
}

export async function updateTask(
  id: number,
  taskData: TaskInput,
  taskInfoData: TaskInfoInput
) {
  return await knex.transaction(async (trx) => {
    const updatedTask = (
      await trx("tasks").where({ id }).update(taskData).returning("*")
    )[0];

    const updatedInfo = (
      await trx(updatedTask.info_type)
        .where({ id: updatedTask.info_id })
        .update(taskInfoData)
        .returning("*")
    )[0];

    return { ...updatedTask, info: updatedInfo };
  });
}
