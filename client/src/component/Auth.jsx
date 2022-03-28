import React from "react";
import userContext from "../context/userContext";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: undefined };
  }

  /**
   * send a GET request to the server to set a default context when a user opens the
   * web page, setting the context to a user if a session already exists
   */

  componentDidMount() {
    fetch("/api/sessions", {
      method: "GET",
      mode: "cors",
    }).then((res) => this.setState({ user: res.body }));
  }

  /**
   * send a POST request to the server with the email and password submitted from
   * the login form, set the context to the user if successful, otherwise log the
   * error message to the console
   */

  login(email, password) {
    fetch("/api/sessions", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            this.setState({ user: res.body });
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
    }).then((res) => this.setState({ user: undefined }));
  }

  render() {
    return (
      <userContext.Provider value={this.state.user}>
        {!this.state.user ? (
          <Navbar onSubmit={this.logout}></Navbar>
        ) : (
          <LoginForm onSubmit={this.login} />
        )}
      </userContext.Provider>
    );
  }
}

export default Auth;
