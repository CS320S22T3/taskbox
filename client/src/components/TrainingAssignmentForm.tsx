import React from "react";
import { Form } from "react-bootstrap";

interface TrainingAssignmentFormParameters {
  info: any;
  onChange: (e: any) => void;
}

class TrainingAssignmentForm extends React.Component<TrainingAssignmentFormParameters> {
  render() {
    return (
      <Form>
        <Form.Group>
        <Form.Label>Link:</Form.Label>
          <Form.Control
            type="url"
            name="link"
            value={this.props.info.start_date || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default TrainingAssignmentForm;
