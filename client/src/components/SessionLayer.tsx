import React from "react";
import UserContext from "../context/UserContext";
import LoginForm from "./LoginForm";

interface AuthProps {
  children?: React.ReactNode;
}
class Auth extends React.Component<AuthProps, { user_id?: string }> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { user_id: undefined };

    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  /**
   * send a GET request to the server to set a default context when a user opens the
   * web page, setting the context to a user if a session already exists
   */

  componentDidMount() {
    fetch("/api/sessions", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ user_id: json.user_id }));
  }

  /**
   * send a POST request to the server with the email and password submitted from
   * the login form, set the context to the user if successful, otherwise log the
   * error message to the console
   */

  async login(email: string, password: string): Promise<string> {
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      switch (res.status) {
        case 200: {
          const json = await res.json();
          this.setState({ user_id: json.user_id });

          return json.user_id;
        }
        case 400:
          throw new Error("Malformed request syntax.");
        case 422:
          throw new Error("Incorrect username or password.");
        case 500:
          throw new Error("Internal server error.");
        default:
          throw new Error(`Unexpected error code: ${res.status}.`);
      }
    } catch (e) {
      console.error(e);
      throw new Error("Unexpected fetch/response error.");
    }
  }

  /**
   * send a DELETE request to the server to end the user's session and logout, remove that user
   * from the context
   */

  logout() {
    return fetch("/api/sessions", {
      method: "DELETE",
      mode: "cors",
    }).then(() => this.setState({ user_id: undefined }));
  }


  render() {
    return (
      <UserContext.Provider
        value={{
          userId: this.state.user_id,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.state.user_id ? (
          this.props.children
        ) : (
          <LoginForm onSubmit={this.login} />
        )}
      </UserContext.Provider>
    );
  }
}

export default Auth;
