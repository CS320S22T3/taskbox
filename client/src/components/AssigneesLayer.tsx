import React from "react";
import UserContext from "../context/UserContext";
import LoginForm from "./LoginForm";

interface UsersProps {
  children?: React.ReactNode;
}
class Auth extends React.Component<
  UsersProps,
  { users?: Object[] }
> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { users: [] };
  }

  /**
   * send a GET request to the server to set a default context when a user opens the
   * web page, setting the context to a user if a session already exists
   */

  componentDidMount() {
    fetch("/api/users", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ users: json.users }));
  }

  /**
   * send a POST request to the server with the email and password submitted from
   * the login form, set the context to the user if successful, otherwise log the
   * error message to the console
   */

  render() {
    return (
      <UserContext.Provider
        value={{
          users: this.state.users,
        }}
      >
      </UserContext.Provider>
    );
  }
}

export default Auth;
