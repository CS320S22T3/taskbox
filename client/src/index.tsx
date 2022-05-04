import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import TaskForm from "./components/TaskForm"

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <TaskForm assigneeOptions={[{ id: 0, first_name: "matt", last_name: "crowe" }]} assignee_id={0} info_type={""} due_date={""} onSubmit={console.log}></TaskForm> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
