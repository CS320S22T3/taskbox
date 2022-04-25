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