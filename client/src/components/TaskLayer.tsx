import React from "react";
import { IUserContext, withSession } from "../context/UserContext";
import TaskContext from "../context/TaskContext";

interface TaskProps {
  children?: React.ReactNode;
}
class TaskLayer extends React.Component<
  TaskProps & IUserContext,
  { tasks: Map<number, any> }
> {
  constructor(props: TaskProps & IUserContext) {
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
    return fetch(`/api/users/${this.props.user?.id}/tasks`, {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(this.setTaskMap.bind(this));
  }

  setTaskMap(data: any) {
    const map = new Map();
    for (let i = 0; i < data.length; i++) {
      map.set(data[i].id, data[i]);
    }

    this.setState({
      tasks: map,
    });
  }

  /**
   * send a POST request to the server to create a new task in tasks table, and a new
   * entry in the appropriate task table such as time_off_requests (issue #65)
   */
  async createTask(data: any) {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      switch (res.status) {
        case 200: {
          this.setState({
            tasks: this.state.tasks.set(json.id, json),
          });
          return this.state.tasks;
        }
        default:
          console.error(res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * send a PUT request to update an existing task in tasks table, and update the
   * subsequent task table such as time_off_requests (issue #66)
   */
  async updateTask(data: any) {
    try {
      const res = await fetch(`api/tasks/${data.id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      switch (res.status) {
        case 200: {
          this.setState({
            tasks: this.state.tasks.set(json.id, json),
          });
          break;
        }
        default:
          console.error(res);
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <TaskContext.Provider
        value={{
          tasks: this.state.tasks,
          createTask: this.createTask,
          updateTask: this.updateTask,
        }}
      >
        {this.props.children}
      </TaskContext.Provider>
    );
  }
}

export default withSession(TaskLayer);
