import React from "react";
import "./App.css";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";
import TaskLayer from "./components/TaskLayer";

function App() {
  return (
    <Auth>
      <TaskLayer>
        <Layout>
          <UserContext.Consumer>
            {(userContext) => `Logged in to user id ${userContext.userId}! 😎`}
          </UserContext.Consumer>
        </Layout>
      </TaskLayer>
    </Auth>
  );
}

export default App;
