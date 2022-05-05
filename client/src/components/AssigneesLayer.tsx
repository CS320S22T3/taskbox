import React from "react";
import AssigneesContext from "../context/AssigneesContext";

interface UsersProps {
  children?: React.ReactNode;
}
class AssigneesLayer extends React.Component<
  UsersProps,
  { users?: any }
> {
  constructor(props: UsersProps) {
    super(props);
    this.state = { users: undefined };
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
    .then((json) => this.setState({ users: json.users }))
    .then(()=>console.log(this.state.users));
    
  }

  /**
   * send a POST request to the server with the email and password submitted from
   * the login form, set the context to the user if successful, otherwise log the
   * error message to the console
   */

  render() {
    return (
      <AssigneesContext.Provider
        value={{users: this.state.users}}
      >
      </AssigneesContext.Provider>
    );
  }
}

export default AssigneesLayer;
