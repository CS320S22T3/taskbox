import React from "react";
import TaskContext from "../context/TaskContext"


interface TaskProps {
    children?: React.ReactNode;
}
class TaskLayer extends React.Component<TaskProps, { tasks?: [] }>{
    constructor(props: TaskProps) {
        super(props);
        this.state = { tasks: [] };

        this.create_task = this.create_task.bind(this);
        this.update_task = this.update_task.bind(this);
    }


    /**
   * send a GET request to the server to return all tasks associated with a certain 
   * user ID, including all supplemental information associated with tasks (issue #64)
   */
    componentDidMount() {
        return fetch("/api/users", {
            method: "GET",
            mode: "cors"
        })
            .then((res) => res.json())
            .then();
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
            <TaskContext.Provider
                value={{
                    create_task: this.create_task,
                    update_task: this.update_task
                }}
            >

            </TaskContext.Provider>
        );
    }
}

export default TaskLayer;