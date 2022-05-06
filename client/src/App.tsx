import React from "react";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import AssigneesLayer from "./components/AssigneesLayer";
import AssigneesContext from "./context/AssigneesContext";

function App() {
  return (
    <Auth>
      <AssigneesLayer>
        <Layout>
          <AssigneesContext.Consumer>
            {(AssigneesContext) =>
              `They have the following possible Assignees: ${AssigneesContext.users
                ?.map(
                  (user: any) =>
                    `${user.id}. ${user.first_name} ${user.last_name}`
                )
                .join(", ")}`
            }
          </AssigneesContext.Consumer>
        </Layout>
      </AssigneesLayer>
    </Auth>
  );
}

export default App;
