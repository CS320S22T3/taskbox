import React from "react";
import { Button, Form } from "react-bootstrap";

interface PerformanceReviewParameters {
  assigneeOptions: any;
  assigner_id: number;
  assignee_id: number;
  due_date: string;

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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      assigner_id: props.assigner_id,
      assignee_id: props.assignee_id,
      due_date: props.due_date,
    };
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
      <Form onSubmit={this.handleSubmit}>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    );
  }
}

export default PerformanceReview;
