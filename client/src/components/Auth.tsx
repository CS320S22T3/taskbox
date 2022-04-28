import React from "react";
import UserContext from "../context/UserContext";
import LoginForm from "./LoginForm";

interface AuthProps {
  children?: React.ReactNode;
}
class Auth extends React.Component<
  AuthProps,
  { user_id?: string; error?: string }
> {
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

  async login(email: string, password: string): Promise<void> {
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const json = await res.json();
        this.setState({ user_id: json.user_id, error: undefined });
      } else {
        const errorMessages = new Map<number, string>([
          [400, "Malformed request syntax."],
          [422, "Incorrect username or password."],
          [500, "Internal server error."],
        ]);

        const message = errorMessages.get(res.status);

        this.setState({ error: message || "Unknown response error occurred." });
      }
    } catch (e) {
      console.error(e);
      this.setState({ error: "Unknown request error occurred." });
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
          <div className="d-flex justify-content-center align-items-center h-100">
            <LoginForm onSubmit={this.login} error={this.state.error} />
          </div>
        )}
      </UserContext.Provider>
    );
  }
}

export default Auth;
