import React from "react";
import Auth from "./components/SessionLayer";
import Layout from "./components/Layout";
import AssigneesLayer from "./components/AssigneesLayer";
import { Tab, Tabs } from "react-bootstrap";
import UserContext from "./context/UserContext";
import TaskContext from "./context/TaskContext";
import TaskGrid from "./components/TaskGrid";
import TaskLayer from "./components/TaskLayer";

function filter(tasks: any, field: any, value: any): Array<any> {
  const arr = Array.from(tasks.values()).filter((t: any) => t[field] === value);

  return arr;
}

function App() {
  return (
    <Auth>
      <TaskLayer>
        <AssigneesLayer>
          <Layout>
            <UserContext.Consumer>
              {(userContext) => (
                <TaskContext.Consumer>
                  {(taskContext) => (
                    <Tabs
                      defaultActiveKey="assignee"
                      id="uncontrolled-tab-example"
                      className="mb-3"
                    >
                      <Tab
                        eventKey="assignee"
                        title={"Assigned to " + userContext.user?.first_name}
                      >
                        <TaskGrid
                          tasks={filter(
                            taskContext.tasks,
                            "assignee_id",
                            userContext.user?.id
                          )}
                        />
                      </Tab>
                      <Tab
                        eventKey="profile"
                        title={"Assigned from " + userContext.user?.first_name}
                      >
                        <TaskGrid
                          tasks={filter(
                            taskContext.tasks,
                            "assigner_id",
                            userContext.user?.id
                          )}
                        />
                      </Tab>
                    </Tabs>
                  )}
                </TaskContext.Consumer>
              )}
            </UserContext.Consumer>
          </Layout>
        </AssigneesLayer>
      </TaskLayer>
    </Auth>
  );
}

export default App;
