import React from "react";
import { Form } from "react-bootstrap";

interface TimeOffRequestFormParameters {
  info: any;
  onChange: (e: any) => void;
}

//type: integer - <select> (0 => 'Sick Time', 1 => 'Jury Duty', 2 => 'Vacation Time', 3 => 'Parental Leave')
//start_date: string - <input> (YYYY-MM-DD)
//end_date: string - <input> (YYYY-MM-DD)
//notes: string - <textarea></textarea>

class TimeOffRequestForm extends React.Component<TimeOffRequestFormParameters> {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Select
            value={this.props.info.type || ""}
            name="type"
            onChange={this.props.onChange}
          >
            <option value="">Select an option</option>
            <option value="0">Sick Time</option>
            <option value="1">Jury Duty</option>
            <option value="2">Vacation Time</option>
            <option value="3">Parental Leave</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date:</Form.Label>
          <Form.Control
            type="text"
            name="start_date"
            value={this.props.info.start_date || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>End Date:</Form.Label>
          <Form.Control
            type="text"
            name="end_date"
            value={this.props.info.end_date || ""}
            onChange={this.props.onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            as="textarea"
            name="notes"
            value={this.props.info.notes || ""}
            onChange={this.props.onChange}
          ></Form.Control>
        </Form.Group>
      </Form>
    );
  }
}

export default TimeOffRequestForm;
