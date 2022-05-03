import React from "react";

interface TrainingAssignmentFormParameters {
  // assigneeOptions: any;
  // assigner_id: number;
  // assignee_id: number;
  // due_date: string;
  // onSubmit: (
  //   assigner_id: number,
  //   assignee_id: number,
  //   due_date: string,
  //   link: string
  // ) => void;
  info: {
    // due_date: string,
    type: number,
    start_date: string,
    end_date: string,
    notes: string,
    link: string,
  }
  onChange: (e: any) => void;
}

class TrainingAssignmentForm extends React.Component<TrainingAssignmentFormParameters> {
  render() {
    return (
      <div>
        <label>
          Link:
          <br></br>
          <input
            type="url"
            name="link"
            value={this.props.info.start_date}
            onChange={this.props.onChange}
          />
        </label>
        <br></br>
      </div>
    );
  }
}

export default TrainingAssignmentForm;
