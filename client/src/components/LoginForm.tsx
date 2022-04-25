import React from "react";

interface LoginFormParameters {
  onSubmit: (username: string, password: string) => void;
}

interface LoginFormState {
  email: string;
  password: string;
}

class LoginForm extends React.Component<LoginFormParameters, LoginFormState> {
  constructor(props: LoginFormParameters) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
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
