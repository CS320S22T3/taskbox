import React from "react";

interface TrainingAssignmentFormParameters {
  info: any;
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
