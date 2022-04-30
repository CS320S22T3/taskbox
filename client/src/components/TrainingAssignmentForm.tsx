import React from "react";

interface TrainingAssignmentFormParameters {
  assigneeOptions: any;
  assigner_id: number;
  assignee_id: number;
  due_date: string;
  onSubmit: (
    assigner_id: number,
    assignee_id: number,
    due_date: string,
    link: string
  ) => void;
}

interface TrainingAssignmentFormState {
  assigner_id: number;
  assignee_id: number;
  due_date: string;
  link: string;
}

class TrainingAssignmentForm extends React.Component<
  TrainingAssignmentFormParameters,
  TrainingAssignmentFormState
> {
  constructor(props: TrainingAssignmentFormParameters) {
    super(props);
    this.state = {
      assigner_id: props.assigner_id,
      assignee_id: props.assignee_id,
      due_date: props.due_date,
      link: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
  }

  handleLinkChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ link: event.target.value });
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    if (this.props.onSubmit != null)
      this.props.onSubmit(
        this.state.assigner_id,
        this.state.assignee_id,
        this.state.due_date,
        this.state.link
      );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Link:
          <br></br>
          <input
            type="url"
            value={this.state.link}
            onChange={this.handleLinkChange}
          />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TrainingAssignmentForm;
