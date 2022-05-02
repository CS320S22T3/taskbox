import React from "react";

interface UserContext {
  login: (username: string, password: string) => void;
  logout: () => void;
  userId?: string;
}

export default React.createContext<UserContext>({
  login: () => undefined,
  logout: () => undefined,
});


export function withSession(WrappedComponent: any) {
  const WrapperComponent = (props: any) => (
    <UserContext.Consumer>
      {(value: any) => <WrappedComponent {...value} {...props} />}
    </UserContext.Consumer>
  );

  WrapperComponent.displayName = `withSession(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return React.forwardRef(WrapperComponent);
}
