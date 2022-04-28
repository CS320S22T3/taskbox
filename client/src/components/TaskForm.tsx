import React from "react";
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
    this.handleInfoTypeChange = this.handleInfoTypeChange.bind(this);
  }

  handleInfoTypeChange(e: any) {
    this.setState(() => ({
      info_type: e.target.value
    }));
  }

  render() {
    return (
      <div>
        <form>
          <select name="info_type" id="info_type" onChange={(e) => this.handleInfoTypeChange(e)}>
            <option value="default">Select an option</option>
            <option value="PerformanceReview">Performance Review</option>
            <option value="TimeOffRequest">TimeOffRequest</option>
            <option value="TrainingAssignment">TrainingAssignment</option>
          </select>
        </form>

        {this.state.info_type === "PerformanceReview" && (
          <PerformanceReview
            assigneeOptions={[]}
            onSubmit={(assigner_id, assignee_id, due_date) => null}>
          </PerformanceReview>)}
        {this.state.info_type === "TimeOffRequest" && (
          <TimeOffRequestForm
            assigneeOptions={[]}
            onSubmit={(assigner_id, assignee_id, due_date, type, start_date, end_date) => null}>
          </TimeOffRequestForm>)}
        {this.state.info_type === "TrainingAssignment" && (
          <TrainingAssignmentForm
            assigneeOptions={[]}
            onSubmit={(assigner_id, assignee_id, due_date, link) => null}>
          </TrainingAssignmentForm>
        )}

      </div>
    );
  }
}

export default TaskForm;