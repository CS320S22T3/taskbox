import React from "react";

interface UserContext {
  login: (username: string, password: string) => Promise<string>; // Resolve to the id of the user
  logout: () => Promise<unknown>;
  userId?: string;
}

const UserContext = React.createContext<UserContext>({
  login: async () => "",
  logout: async () => "",
});

export default UserContext;

export function withSession(WrappedComponent: any) {
  return (props: any) => (
    <UserContext.Consumer>
      {(value) => <WrappedComponent {...value} {...props} />}
    </UserContext.Consumer>
  );
}