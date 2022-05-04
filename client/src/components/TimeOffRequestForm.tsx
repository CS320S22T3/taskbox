import React from "react";

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
      <div>
        <label>
          Type:
          <select value={this.props.info.type || ""} name="type" onChange={this.props.onChange}>
            <option value="">Select an option</option>
            <option value="0">Sick Time</option>
            <option value="1">Jury Duty</option>
            <option value="2">Vacation Time</option>
            <option value="3">Parental Leave</option>
          </select>
        </label>
        <br></br>
        <label>
          Start Date:
          <input
            type="text"
            name="start_date"
            value={this.props.info.start_date || ""}
            onChange={this.props.onChange}
          />
        </label>
        <br></br>
        <label>
          End Date:
          <input
            type="text"
            name="end_date"
            value={this.props.info.end_date || ""}
            onChange={this.props.onChange}
          />
        </label>
        <br></br>
        <label>
          Notes:
          <textarea
            name="notes"
            value={this.props.info.notes || ""}
            onChange={this.props.onChange}
          ></textarea>
        </label>
        <br></br>
      </div>
    );
  }
}

export default TimeOffRequestForm;
