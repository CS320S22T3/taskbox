import React from "react";
import TasksContext from "../context/TasksContext"


interface TaskProps {
    children?: React.ReactNode;
}
class TasksLayer extends React.Component<TaskProps, { tasks?: string }>{
    constructor(props: TaskProps) {
        super(props);
        this.state = { tasks: undefined };

        this.fetch_tasks = this.fetch_tasks.bind(this);
        //this.login = this.login.bind(this);
    }


    /**
   * send a GET request to the server to return all tasks associated with a certain 
   * user ID, including all supplemental information associated with tasks (issue #64)
   */
    fetch_tasks() {
        return fetch("api/tasks", {
            method: "GET",
            mode: "cors"
        }).then((res) => res.json());
    }

    /**
   * send a POST request to the server to create a new task in tasks table, and a new
   * entry in the approprate task table such as time_off_requests (issue #65)
   */
    create_task() {
        return fetch("api/tasks", {
            method: "POST",
            mode: "cors"
        }).then((res) => res.json());
    }

    /**
   * send a PUT request to update an existing task in tasks table, and update the 
   * subsequent task table such as time_off_requests (issue #66)
   */
    update_task() {
        return fetch("api/tasks", {
            method: "PUT",
            mode: "cors"
        }).then((res) => res.json());
    }

    render() {
        return (
            <TasksContext.Provider
                value={{
                    fetch_tasks: this.fetch_tasks,
                    create_task: this.create_task,
                    update_task: this.update_task
                }}
            >

            </TasksContext.Provider>
        );
    }
}

export default TasksLayer;