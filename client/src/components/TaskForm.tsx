import React from "react";
import TimeOffRequestForm from "./TimeOffRequestForm";
import TrainingAssignmentForm from "./TrainingAssignmentForm";

interface TaskFormParameters {
  assigneeOptions: any;
  info_type: string;
  assignee_id: number;
  due_date: string;
  onSubmit: (fields: TaskFormState) => void;
}

interface TaskFormState {
  info_type?: string;
  assignee_id?: number;
  due_date?: string;
  info?: any;
}

class TaskForm extends React.Component<TaskFormParameters, TaskFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      info_type: "",
      assignee_id: -1,
      due_date: "",
      info: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubFormChange = this.handleSubFormChange.bind(this);
  }

  handleChange(event: any) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubFormChange = (event: any) => {
    this.setState((prevState) => ({
      info: {
        ...prevState.info,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleSubmit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Assignee Id:
            <select
              onChange={this.handleChange}
              name="assignee_id"
              value={this.state.assignee_id}
            >
              <option value="">Select an option</option>
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
              name="due_date"
              value={this.state.due_date}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Form type:
            <select
              name="info_type"
              id="info_type"
              value={this.state.info_type}
              onChange={(e) => this.handleChange(e)}
            >
              <option value="">Select an option</option>
              <option value="performance_review_requests">
                Performance Review
              </option>
              <option value="time_off_requests">TimeOffRequest</option>
              <option value="training_assignments">TrainingAssignment</option>
            </select>
          </label>
          <br />
          {this.state.info_type === "time_off_requests" && (
            <TimeOffRequestForm
              info={this.state.info}
              onChange={this.handleSubFormChange}
            ></TimeOffRequestForm>
          )}
          {this.state.info_type === "training_assignments" && (
            <TrainingAssignmentForm
              info={this.state.info}
              onChange={this.handleSubFormChange}
            ></TrainingAssignmentForm>
          )}

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TaskForm;
