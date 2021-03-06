import React from "react";

interface TaskContext {
  createTask?: (data: any) => void;
  updateTask?: (data: any) => void;
  tasks: Map<number, any>;
}

const TaskContext = React.createContext<TaskContext>({
  createTask: async () => "",
  updateTask: async () => "",
  tasks: new Map(),
});

export default TaskContext;

export function withTasks(WrappedComponent: any) {
  const WrapperComponent = (props: any) => (
    <TaskContext.Consumer>
      {(value) => <WrappedComponent {...value} {...props} />}
    </TaskContext.Consumer>
  );

  WrapperComponent.displayName = `withTasks(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return React.forwardRef(WrapperComponent);
}
