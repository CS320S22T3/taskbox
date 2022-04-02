import React from "react";
import UserContext from "../context/UserContext";

function Navbar() {
  return (
    <UserContext.Consumer>
      {(userContext) => (
        <nav>
          <button onClick={userContext?.logout}>Log Out</button>
        </nav>
      )}
    </UserContext.Consumer>
  );
}

export default Navbar;
