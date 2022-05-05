import React from "react";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";
import AssigneesLayer from "./components/AssigneesLayer";

function App() {
  return (
    <Auth>
      <Layout>
        <AssigneesLayer />
        <UserContext.Consumer>
          {(userContext) => `Logged in to user id ${userContext.user?.id}! 😎`}
        </UserContext.Consumer>
      </Layout>
    </Auth>
  );
}

export default App;
