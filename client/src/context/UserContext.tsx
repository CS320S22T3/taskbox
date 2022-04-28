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
