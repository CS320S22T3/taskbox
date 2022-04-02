import React from "react";

interface UserContext {
  login: (username: string, password: string) => Promise<string>; // Resolve to the id of the user
  logout: () => Promise<unknown>;
  userId?: string;
}

export default React.createContext<UserContext>({
  login: async () => "",
  logout: async () => "",
});
