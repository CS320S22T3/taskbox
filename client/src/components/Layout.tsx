import React from "react";
import "./App.css"

function Layout(props: { children: typeof React.Component }) {
    return (
        <div>
            <header className="App-header">

            </header>
            <main>
                <props.children/>
            </main>
        </div>
        
    );
}