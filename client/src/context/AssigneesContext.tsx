import React from "react";

interface AssigneesContext {
  users?: Object[];
}

export default React.createContext<AssigneesContext>({users: []});
