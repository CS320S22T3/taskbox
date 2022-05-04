import React from "react";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";

function App() {
  return (
    <Auth>
      <Layout>
        <UserContext.Consumer>
          {(userContext) => `Logged in to user id ${userContext.user?.id}! 😎`}
        </UserContext.Consumer>
      </Layout>
    </Auth>
  );
}

export default App;
