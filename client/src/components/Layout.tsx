import React from "react";
import Navbar from "./Navbar";

function Layout(props: { children: any }) {
  return (
    <div>
      <header >
        <Navbar />
      </header>
      <main>
        {props.children }
      </main>
    </div>
  );
}

export default Layout;
