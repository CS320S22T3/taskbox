import React from "react";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import UserContext from "./context/UserContext";
import AssigneesLayer from "./components/AssigneesLayer";
import AssigneesContext from "./context/AssigneesContext";

function App() {
  return (
    <Auth>
      <AssigneesLayer>
        <Layout>
          <UserContext.Consumer>
            {(userContext) => `Logged in to user id ${userContext.user?.id}! 😎`}
          </UserContext.Consumer>
          <br></br>
          <AssigneesContext.Consumer>
            {(AssigneesContext) => 
              `They have the following possible Assignees: ${
                AssigneesContext.users?.map(
                  (user: any) => `${user.first_name} ${user.last_name}`)
                .join(", ")
              }`
            }
          </AssigneesContext.Consumer>
        </Layout>
        </AssigneesLayer>
    </Auth>
  );
}

export default App;
