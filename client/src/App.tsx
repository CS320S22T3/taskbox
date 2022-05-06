import React from "react";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";
import TaskContext from "./context/TaskContext";
import TaskLayer from "./components/TaskLayer";

function App() {
  return (
    <Auth>
      <TaskLayer>
        <Layout>
          <UserContext.Consumer>
            {(userContext) => `Logged in with user ${userContext.user?.id}.`}
          </UserContext.Consumer>
          <TaskContext.Consumer>
            {(taskContext) =>
              `They have the following tasks: ${Array.from(
                taskContext.tasks.values()
              )
                .map((task) => JSON.stringify(task))
                .join(", ")}.`
            }
          </TaskContext.Consumer>
        </Layout>
      </TaskLayer>
    </Auth>
  );
}

export default App;
