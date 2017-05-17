import React, { Component } from "react";
import { render } from "react-dom";
import Todo from "./Todo";


const App=() => (
    <div style={{textAlign:"center"}}>
        Recently,i alway think about how to build a SPA quickly.
        <Todo/>
    </div>
);

export default App;