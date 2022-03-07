import React from "react";
import PropTypes from 'prop-types';
import "./index.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    if (this.props.onSubmit != null)
      this.props.onSubmit(this.state.email, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <br></br>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </label>
        <br></br>
        <label>
          Password:
          <br></br>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default LoginForm;
