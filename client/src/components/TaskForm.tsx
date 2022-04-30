import React from "react";
import TimeOffRequestForm from "./TimeOffRequestForm";
import TrainingAssignmentForm from "./TrainingAssignmentForm";
import PerformanceReview from "./PerformanceReview";

interface TaskFormParameters {
  assigneeOptions: any;
}

interface TaskFormState {
  info_type: string;
  assigner_id: number;
  assignee_id: number;
  due_date: string;
}

class TaskForm extends React.Component<
  TaskFormParameters,
  TaskFormState
>{
  constructor(props: any) {
    super(props);
    this.state = {
      info_type: "",
      assigner_id: -1,
      assignee_id: -1,
      due_date: "",
    };
    this.handleInfoTypeChange = this.handleInfoTypeChange.bind(this);
    this.handleAssigneeIdChange = this.handleAssigneeIdChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
  }

  handleInfoTypeChange(e: any) {
    this.setState(() => ({
      info_type: e.target.value,
    }));
  }

  handleAssigneeIdChange = (e: any) => {
    this.setState(() => ({
      assignee_id: e.target.value,
    }));
  };

  handleDueDateChange = (e: any) => {
    this.setState(() => ({
      due_date: e.target.value,
    }));
  };

  render() {
    return (
      <div>
        <form>
          <label>
            Assigner Id:
            <p hidden>{this.state.assigner_id}</p>
          </label>
          <br></br>
          <label>
            Assignee Id:
            <select onChange={this.handleAssigneeIdChange}>
              {this.props.assigneeOptions.map((assigneeOption: any) => (
                <option key={assigneeOption.id} value={assigneeOption.id}>
                  {`${assigneeOption.first_name} ${assigneeOption.last_name}`}
                </option>
              ))}
            </select>
          </label>
          <br></br>
          <label>
            Due Date:
            <input
              type="text"
              value={this.state.due_date}
              onChange={this.handleDueDateChange}
            />
          </label>
          <br />
          <label>
            Form type:
            <select
              name="info_type"
              id="info_type"
              onChange={(e) => this.handleInfoTypeChange(e)}
            >
              <option value="default">Select an option</option>
              <option value="PerformanceReview">Performance Review</option>
              <option value="TimeOffRequest">TimeOffRequest</option>
              <option value="TrainingAssignment">TrainingAssignment</option>
            </select>
          </label>
          <br />
        </form>

        {this.state.info_type === "PerformanceReview" && (
          <PerformanceReview
            assigner_id={this.state.assigner_id}
            assignee_id={this.state.assignee_id}
            due_date={this.state.due_date}
            assigneeOptions={[]}
            onSubmit={(_assigner_id, _assignee_id, _due_date) => null}>
          </PerformanceReview>
        )}
        {this.state.info_type === "TimeOffRequest" && (
          <TimeOffRequestForm
            assigner_id={this.state.assigner_id}
            assignee_id={this.state.assignee_id}
            due_date={this.state.due_date}
            assigneeOptions={[]}
            onSubmit={(
              _assigner_id,
              _assignee_id,
              _due_date, _type,
              _start_date,
              _end_date) => null}
          >
          </TimeOffRequestForm>
        )}
        {this.state.info_type === "TrainingAssignment" && (
          <TrainingAssignmentForm
            assigner_id={this.state.assigner_id}
            assignee_id={this.state.assignee_id}
            due_date={this.state.due_date}
            assigneeOptions={[]}
            onSubmit={(_assigner_id, _assignee_id, _due_date, _link) => null}>
          </TrainingAssignmentForm>
        )}
      </div>
    );
  }
}

export default TaskForm;
