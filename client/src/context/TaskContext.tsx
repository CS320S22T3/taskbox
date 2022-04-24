import React from "react";

interface TaskContext {
    create_task: () => Promise<unknown>;
    update_task: () => Promise<unknown>;
    tasks?: string
}

export default React.createContext<TaskContext>({
    create_task: async () => "",
    update_task: async () => ""
});