import React from "react";
import { Button, Form } from "react-bootstrap";
import "../styles/index.scss";

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
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={this.handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
