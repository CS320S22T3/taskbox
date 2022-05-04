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
  const trx = await knex.transaction();

  const newInfo = await trx(taskInfoType).insert(taskInfoData).returning("id");
  const info_id = newInfo[0].id;

  try {
    const task = await trx("tasks")
      .insert({
        info_id,
        created_date: new Date(),
        info_type: taskInfoType,
        ...taskData,
      })
      .returning("*");

    await trx.commit();

    return Object.assign(task, newInfo);
  } catch (e) {
    await trx.rollback();
    throw e;
  }
}

export async function fetchTask(id: number) {
  return await knex("tasks").where({ id }).first();
}

export async function updateTask(
  id: number,
  taskData: TaskInput,
  taskInfoData: TaskInfoInput
) {
  const trx = await knex.transaction();

  try {
    const updatedTask = (
      await trx("tasks").where({ id }).update(taskData).returning("*")
    )[0];

    const updatedInfo = (
      await trx(updatedTask.info_type)
        .where({ id: updatedTask.info_id })
        .update(taskInfoData)
        .returning("*")
    )[0];

    await trx.commit();

    return Object.assign(updatedTask, updatedInfo);
  } catch (e) {
    await trx.rollback();
    throw e;
  }
}
