import React from "react";
import AssigneesContext, {
  IAssigneesContext,
  withAssignees,
} from "../context/AssigneesContext";

interface UsersProps {
  children?: React.ReactNode;
}
class AssigneesLayer extends React.Component<
  UsersProps & IAssigneesContext,
  { users?: any }
> {
  constructor(props: UsersProps) {
    super(props);
    this.state = { users: undefined };
  }

  /**
   * send a GET request to the server to set a default context when a user opens the
   * web page, setting the context to the list of possible users,
   * the user state is designed as an array of objects where each object refers to a user
   */

  componentDidMount() {
    fetch("/api/users", {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ users: json }));
  }

  render() {
    return (
      <AssigneesContext.Provider value={{ users: this.state.users }}>
        {this.props.children}
      </AssigneesContext.Provider>
    );
  }
}

export default withAssignees(AssigneesLayer);
