import knex from "../pool";

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

export async function createTask(taskData: any) {
  // const newInfo = await knex(taskData.info_type)
  //   .insert(taskData.info)
  //   .returning("id");

  // const info_id = newInfo[0].id;
  // const { info, ...taskInfo } = taskData;

  // return await knex("tasks")
  //   .insert({ ...taskInfo, info_id })
  //   .returning("*")
  //   .first();
  return undefined;
}

export async function updateTask(id: number, taskUpdateData: any) {
  // const { infoUpdate, ...taskUpdateData } = taskUpdateData;
  // const task = (
  //   await knex("tasks")
  //     .where({ id })
  //     .update({ ...task })
  //     .returning("*")
  // )[0];
  // task[0].info = await knex(task[0].info_type)
  //   .where({ id: task[0].info_id })
  //   .update(info_attributes, "*"); // update the associated info
  // return task;

  return undefined;
}
