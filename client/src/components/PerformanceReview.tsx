import React from "react";
import "./App.css";

interface PerformanceReviewParameters {
  onSubmit: (
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
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      assigner_id: -1,
      assignee_id: -1,
      due_date: "",
    };
  }

  handleDateChange(e) {
    const newDate = e.target.value;

    this.setState(() => ({
      due_date: newDate,
    }));
  }

  handleSubmit = (e) => {
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
          Assigner ID:
          <input type="hidden" value={this.state.assigner_id} />
        </label>
        <br />
        <label>
          Asignee ID:
          <select value={this.state.assignee_id}></select>
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
