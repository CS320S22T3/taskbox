import React from "react";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import MainDisplay from "./components/MainDisplay";
import UserContext from "./context/UserContext";
import TaskContext from "./context/TaskContext";
import TaskLayer from "./components/TaskLayer";

function App() {
  return (
    <Auth>
      <Layout>
        <UserContext.Consumer>
          {(userContext) => `Logged in to user id ${userContext.user?.id}! 😎`}
        </UserContext.Consumer>
        <MainDisplay />
      </Layout>
    </Auth>
  );
}

export default App;
