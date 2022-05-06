import React from "react";

export interface IAssigneesContext {
  users?: any;
}

const AssigneesContext = React.createContext<IAssigneesContext>({users: []});

export default AssigneesContext

export function withAssignees(WrappedComponent: any) {
  const WrapperComponent = React.forwardRef((props: any, ref: any) => (
    <AssigneesContext.Consumer>
      {(value) => <WrappedComponent ref={ref} {...value} {...props} />}
    </AssigneesContext.Consumer>
  ));
  WrapperComponent.displayName = `withAssignees(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;
  return WrapperComponent;
}
