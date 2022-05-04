import React from "react";
import { UserWithInformation } from "types";

interface UserContext {
  login: (username: string, password: string) => void;
  logout: () => void;
  user?: UserWithInformation;
}

export default React.createContext<UserContext>({
  login: () => undefined,
  logout: () => undefined,
});
