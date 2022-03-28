import React from "react";
import "./App.css";
import Navbar from "./Navbar";

function Layout(props: { children: typeof React.Component }) {
  return (
    <div>
      <header className="App-header">
        <Navbar />
      </header>
      <main>
        <props.children />
      </main>
    </div>
  );
}

export default Layout;
