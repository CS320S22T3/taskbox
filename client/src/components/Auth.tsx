import React from "react";
import userContext from "../context/userContext";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";

class Auth extends React.Component<
  Record<string, never>,
  { user_id?: string }
> {
  constructor() {
    super({});
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

  login(email: string, password: string) {
    fetch("/api/sessions", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            res.json().then((json) => this.setState({ user_id: json.user_id }));
            break;
          case 400:
            break;
          case 422:
            break;
          case 500:
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * send a DELETE request to the server to end the user's session and logout, remove that user
   * from the context
   */

  logout() {
    fetch("/api/sessions", {
      method: "DELETE",
      mode: "cors",
    }).then(() => this.setState({ user_id: undefined }));
  }

  render() {
    return (
      <userContext.Provider value={this.state.user_id}>
        {this.state.user_id ? (
          <>
            <Navbar onSubmit={this.logout}></Navbar>
            <h1>{`Logged in with user id ${this.state.user_id}`}</h1>
          </>
        ) : (
          <LoginForm onSubmit={this.login} />
        )}
      </userContext.Provider>
    );
  }
}

export default Auth;
