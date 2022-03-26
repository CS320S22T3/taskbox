import React from "react";
import "./App.css";
import navBar from "./Navbar";

function Layout(props: { children: typeof React.Component }) {
  return (
    <div>
      <header className="App-header">
        <navBar />
      </header>
      <main>
        <props.children />
      </main>
    </div>
  );
}

export default Layout;
