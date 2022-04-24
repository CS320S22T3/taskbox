import React from "react";
import "./App.css";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";

function App() {
  return (
    <Auth>
      <Layout>
        <UserContext.Consumer>
          {(userContext) => `Logged in to user id ${userContext.userId}! 😎`}
        </UserContext.Consumer>
      </Layout>
    </Auth>
  );
}

export default App;
