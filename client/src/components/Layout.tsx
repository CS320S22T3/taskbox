import React from "react";
import "./App.css";

function Layout(props: { children: typeof React.Component, navbar: typeof React.Component }) {
  return (
    <div>
      <header className="App-header">
        <props.navbar />
      </header>
      <main>
        <props.children />
      </main>
    </div>
  );
}

export default Layout;
