import React from "react";
import "../App.css";

interface PerformanceReviewParameters {
  assigneeOptions: any;

  onSubmit?: (
    assigner_id: number,
    assignee_id: number,
    due_date: string

  ) => void;
  
}

interface PerformanceReviewState {
  assigner_id: number;
  assignee_id: number;
  due_date: string;
}

class PerformanceReview extends React.Component<
  PerformanceReviewParameters,
  PerformanceReviewState
> {
  constructor(props: any) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssigneeChange = this.handleAssigneeChange.bind(this);
    this.state = {
      assigner_id: -1,
      assignee_id: -1,
      due_date: "",
    };
  }

  handleAssigneeChange = (e: any) => {

    console.log(this.state.assignee_id);
    this.setState(() => ({
      assignee_id: e.target.value,
    }));
  };

  handleDateChange(e: any) {
    console.log(this.state.due_date);

    this.setState(() => ({
      due_date: e.target.value,
    }));
  }

  handleSubmit = (e: any) => {
    e.preventDefault();

    if (this.props.onSubmit != null) {
      this.props.onSubmit(
        this.state.assigner_id,
        this.state.assignee_id,
        this.state.due_date
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Performance Review Request</h2>
        <br />
        <label>
          Asignee ID:
          <select onChange={this.handleAssigneeChange}>

            {this.props.assigneeOptions.map((assigneeOption: any) => (
              <option key={assigneeOption.id} value={assigneeOption.id}>
                {`${assigneeOption.first_name} ${assigneeOption.last_name}`}
              </option>
            ))}

          </select>
        </label>
        <br />
        <label>
          Due Date:
          <input
            type="date"
            value={this.state.due_date}
            onChange={this.handleDateChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default PerformanceReview;
