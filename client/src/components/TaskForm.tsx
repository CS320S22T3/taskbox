import React from "react";
import "../index.css";
import TimeOffRequestForm from "./TimeOffRequestForm";
import TrainingAssignmentForm from "./TrainingAssignmentForm";
import PerformanceReview from "./PerformanceReview";

interface TaskFormParameters {
  // assigner_id: number;
  // assignee_id: number;
  // due_date: string;
  onSubmit: () => void;
}

interface TaskFormState {
  info_type: string;
  assigner_id: number;
  assignee_id: number;
}

class TaskForm extends React.Component<
  TaskFormParameters,
  TaskFormState
>{
  constructor(props: any) {
    super(props);
    this.state = {
      assigner_id: -1,
      assignee_id: -1,
      info_type: ""
    }
  }

  handleInfoTypeChange() {

  }

  render() {
    return (
      <div>
        <form>
          <select name="info_type" id="info_type">
            <option value="PerformanceReview">Performance Review</option>
            <option value="TimeOffRequest">TimeOffRequest</option>
            <option value="TrainingAssignment">TrainingAssignment</option>
          </select>

        </form>
        {this.state.info_type === "PerformanceReview" && (<PerformanceReview
          assigneeOptions={null}></PerformanceReview>)}
        {this.state.info_type === "TimeOffRequest" && (<TimeOffRequestForm
          assigneeOptions={null}
          onSubmit={() => null}></TimeOffRequestForm>)}
        {this.state.info_type === "TrainingAssignment" && (<TrainingAssignmentForm
          assigneeOptions={null}
          onSubmit={() => null}></TrainingAssignmentForm>)}
      </div>
    );
  }
}

export default TaskForm;