import React from "react";
import "../index.css";

interface TimeOffRequestFormParameters {
  assigneeOptions: any;
  onSubmit: (
    assigner_id: number,
    assignee_id: number,
    due_date: string,
    type: number,
    start_date: string,
    end_date: string,
    notes: string
  ) => void;
}

//assigner_id: integer - <hidden> (predetermined)
//assignee_id: integer - <select> (user id/name)
//due_date: string - <input> (YYYY-MM-DD)
//type: integer - <select> (0 => 'Sick Time', 1 => 'Jury Duty', 2 => 'Vacation Time', 3 => 'Parental Leave')
//start_date: string - <input> (YYYY-MM-DD)
//end_date: string - <input> (YYYY-MM-DD)
//notes: string - <textarea></textarea>

interface TimeOffRequestFormState {
  assigner_id: number;
  assignee_id: number;
  due_date: string;
  type: number;
  start_date: string;
  end_date: string;
  notes: string;
}

class TimeOffRequestForm extends React.Component<
  TimeOffRequestFormParameters,
  TimeOffRequestFormState
> {
  constructor(props: TimeOffRequestFormParameters) {
    super(props);
    this.state = {
      assigner_id: -1,
      assignee_id: -1,
      due_date: "",
      type: 0,
      start_date: "",
      end_date: "",
      notes: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAssigneeIdChange = this.handleAssigneeIdChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  handleAssigneeIdChange = (e: any) => {
    this.setState(() => ({
      assignee_id: e.target.value,
    }));
  };

  handleDueDateChange = (e: any) => {
    this.setState(() => ({
      due_date: e.target.value,
    }));
  };

  handleTypeChange = (e: any) => {
    this.setState(() => ({
      type: e.target.value,
    }));
  };

  handleStartDateChange = (e: any) => {
    this.setState(() => ({
      start_date: e.target.value,
    }));
  };

  handleEndDateChange = (e: any) => {
    this.setState(() => ({
      end_date: e.target.value,
    }));
  };

  handleNotesChange = (e: any) => {
    this.setState(() => ({
      notes: e.target.value,
    }));
  };

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    if (this.props.onSubmit != null)
      this.props.onSubmit(
        this.state.assigner_id,
        this.state.assignee_id,
        this.state.due_date,
        this.state.type,
        this.state.start_date,
        this.state.end_date,
        this.state.notes
      );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Assigner Id:
          <p hidden>{this.state.assigner_id}</p>
        </label>
        <br></br>
        <label>
          Assignee Id:
          <select onChange={this.handleAssigneeIdChange}>
            {this.props.assigneeOptions.map((assigneeOption: any) => (
              <option key={assigneeOption.id} value={assigneeOption.id}>
                {`${assigneeOption.first_name} ${assigneeOption.last_name}`}
              </option>
            ))}
          </select>
        </label>
        <br></br>
        <label>
          Due Date:
          <input
            type="text"
            value={this.state.due_date}
            onChange={this.handleDueDateChange}
          />
        </label>
        <br></br>
        <label>
          Type:
          <select value={this.state.type} onChange={this.handleTypeChange}>
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
            value={this.state.start_date}
            onChange={this.handleStartDateChange}
          />
        </label>
        <br></br>
        <label>
          End Date:
          <input
            type="text"
            value={this.state.end_date}
            onChange={this.handleEndDateChange}
          />
        </label>
        <br></br>
        <label>
          Notes:
          <textarea
            value={this.state.notes}
            onChange={this.handleNotesChange}
          ></textarea>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TimeOffRequestForm;
