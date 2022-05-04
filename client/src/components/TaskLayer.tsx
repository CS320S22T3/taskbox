import React from "react";
import UserContext from "../context/UserContext";
import TaskContext from "../context/TaskContext";

interface TaskProps {
  children?: React.ReactNode;
}
class TaskLayer extends React.Component<
  TaskProps & UserContext,
  { tasks: Map<number, any> }
> {
  constructor(props: TaskProps & UserContext) {
    super(props);
    this.state = { tasks: new Map() };

    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  /**
   * send a GET request to the server to return all tasks associated with a certain
   * user ID, including all supplemental information associated with tasks (issue #64)
   */
  componentDidMount() {
    const userId = this.props.userId;
    return fetch('/api/users/${this.props.userId}/tasks', {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        let temp = new Map();
        for (let i = 0; i < data.length; i++) {
          //TODO: correct asssumptions about the format
          temp = temp.set(i, data[i]);
        }
        this.setState({
          tasks: temp,
        });
      });
  }

  /**
   * send a POST request to the server to create a new task in tasks table, and a new
   * entry in the approprate task table such as time_off_requests (issue #65)
   */
  async createTask(data: any) {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });

      switch (res.status) {
        case 200: {
          //CORRECT TO UPDATE WITH DB ENTRY RATHER THAN USER INPUT DATA
          const len = this.state.tasks.size;
          this.setState({
            tasks: this.state.tasks.set(len, data),
          });
          return this.state.tasks;
        }
        case 400:
          throw new Error("Malformed request syntax.");
        case 422:
          throw new Error("Incorrect username or password.");
        case 500:
          throw new Error("Internal server error.");
        default:
          throw new Error(`Unexpected error code: ${res.status}.`);
      }
    } catch (e) {
      console.error(e);
      throw new Error("Unexpected error involving POST endpoint.");
    }
  }

  /**
   * send a PUT request to update an existing task in tasks table, and update the
   * subsequent task table such as time_off_requests (issue #66)
   */
  async updateTask(data: any) {
    try {
      const res = await fetch('api/tasks/${data.id}', {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });

      switch (res.status) {
        case 200: {
          //CORRECT TO UPDATE WITH DB ENTRY RATHER THAN USER INPUT DATA
          const len = this.state.tasks.size;
          this.setState({
            tasks: this.state.tasks.set(len, data),
          });
          return this.state.tasks;
        }
        case 400:
          throw new Error("Malformed request syntax.");
        case 422:
          throw new Error("Incorrect username or password.");
        case 500:
          throw new Error("Internal server error.");
        default:
          throw new Error(`Unexpected error code: ${res.status}.`);
      }
    } catch (e) {
      console.error(e);
      throw new Error("Unexpected error involving PUT endpoint.");
    }
  }

  render() {
    return (
      <TaskContext.Provider
        value={{
          tasks: this.state.tasks,
          createTask: this.createTask,
          updateTask: this.updateTask
        }}
      ></TaskContext.Provider>
    );
  }
}

export default TaskLayer;
