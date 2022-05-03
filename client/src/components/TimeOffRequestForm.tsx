import React from "react";

interface TimeOffRequestFormParameters {
  // assigneeOptions: any;
  // assigner_id: number;
  // assignee_id: number;
  // due_date: string;
  // onSubmit: (
  //   assigner_id: number,
  //   assignee_id: number,
  //   due_date: string,
  //   type: number,
  //   start_date: string,
  //   end_date: string,
  //   notes: string
  // ) => void;

  // type: number;
  // start_date: string;
  // end_date: string;
  // notes: string;
  info: {
    type: number,
    start_date: string,
    end_date: string,
    notes: string
  }
  onChange: (e: any) => void;
}

//assigner_id: integer - <hidden> (predetermined)
//assignee_id: integer - <select> (user id/name)
//due_date: string - <input> (YYYY-MM-DD)
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
          <select value={this.props.info.type} onChange={this.props.onChange}>
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
            value={this.props.info.start_date}
            onChange={this.props.onChange}
          />
        </label>
        <br></br>
        <label>
          End Date:
          <input
            type="text"
            value={this.props.info.end_date}
            onChange={this.props.onChange}
          />
        </label>
        <br></br>
        <label>
          Notes:
          <textarea
            value={this.props.info.notes}
            onChange={this.props.onChange}
          ></textarea>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </div>
    );
  }
}

export default TimeOffRequestForm;
