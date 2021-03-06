import React from "react";
import { UserWithInformation } from "types";

export interface IUserContext {
  login: (username: string, password: string) => void;
  logout: () => void;
  user?: UserWithInformation;
}

const UserContext = React.createContext<IUserContext>({
  login: () => undefined,
  logout: () => undefined,
});

export default UserContext;

export function withSession(WrappedComponent: any) {
  const WrapperComponent = React.forwardRef((props: any, ref: any) => (
    <UserContext.Consumer>
      {(value) => <WrappedComponent ref={ref} {...value} {...props} />}
    </UserContext.Consumer>
  ));

  WrapperComponent.displayName = `withSession(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WrapperComponent;
}
