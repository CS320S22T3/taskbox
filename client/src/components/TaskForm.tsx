import React from "react";
import TimeOffRequestForm from "./TimeOffRequestForm";
import TrainingAssignmentForm from "./TrainingAssignmentForm";

interface TaskFormParameters {
  assigneeOptions: any;
  handleSubmit: (
    info: {
      info_type: string;
      assigner_id: number;
      assignee_id: number;
      due_date: string,
      type: number,
      start_date: string,
      end_date: string,
      notes: string,
      link: string
    }) => void;
}

interface TaskFormState {
  info: {
    info_type: string;
    assigner_id: number;
    assignee_id: number;
    due_date: string,
    type: number,
    start_date: string,
    end_date: string,
    notes: string,
    link: string,
  };
}

class TaskForm extends React.Component<
  TaskFormParameters,
  TaskFormState
>{
  constructor(props: any) {
    super(props);
    this.state = {
      info: {
        info_type: "",
        assigner_id: -1,
        assignee_id: -1,
        due_date: "",
        type: 0,
        start_date: "",
        end_date: "",
        notes: "",
        link: "",
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event: any) => {
    this.setState(prevState => ({
      info: {
        ...prevState.info,
        [event.target.name]: event.target.value
      }
    }))
    console.log(this.state.info);
  }

  handleSubmit() {
    if (this.props.handleSubmit)
      this.props.handleSubmit(this.state.info);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Assignee Id:
            <select onChange={this.handleChange}>
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
              value={this.state.info.due_date}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Form type:
            <select
              name="info_type"
              id="info_type"
              onChange={(e) => this.handleChange(e)}
            >
              <option value="default">Select an option</option>
              <option value="performance_review_requests">Performance Review</option>
              <option value="time_off_requests">TimeOffRequest</option>
              <option value="training_assignments">TrainingAssignment</option>
            </select>
          </label>
          <br />
          {this.state.info.info_type === "time_off_requests" && (
            <TimeOffRequestForm
              info={this.state.info}
              onChange={(e) => this.handleChange(e)}
            >
            </TimeOffRequestForm>
          )}
          {this.state.info.info_type === "training_assignments" && (
            <TrainingAssignmentForm
              info={this.state.info}
              onChange={(e) => this.handleChange(e)}>
            </TrainingAssignmentForm>
          )}

          <input type="submit" value="Submit" />
        </form>
      </div >
    );
  }
}

export default TaskForm;
