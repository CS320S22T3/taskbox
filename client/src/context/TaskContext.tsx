import React from "react";

interface TaskContext {
  create_task: (data: any) => Promise<unknown>;
  update_task: (data: any) => Promise<unknown>;
  tasks?: string;
}

const TaskContext = React.createContext<TaskContext>({
  create_task: async () => "",
  update_task: async () => "",
});

export default TaskContext;

export function withTasks(WrappedComponent: any) {
  return (props: any) => (
    <TaskContext.Consumer>
      {(value) => <WrappedComponent {...value} {...props} />}
    </TaskContext.Consumer>
  );
}
