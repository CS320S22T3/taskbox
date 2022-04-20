import React from "react";

interface TasksContext {
    fetch_tasks: (username: string, password: string) => Promise<string>; // Resolve to the id of the user
    create_task: () => Promise<unknown>;
    update_task: () => Promise<unknown>;
    tasks?: string
}

export default React.createContext<TasksContext>({
    fetch_tasks: async () => "",
    create_task: async () => "",
    update_task: async () => ""
});