import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Link } from "react-router-dom";

import Todo from "./Todo";


const App = (props) => {
    console.log(props);
    return (
        <Router>  
        <div style={{ textAlign: "center" }}>
            Recently,i alway think about how to build a SPA quickly.
            <Route
                exact
                path="/todo"
                component={Todo}
            />
            <Route
                path="/:component"
                component={({ match }) => <div >componentName:{match.params.component}</div>}
            />
        </div>
        </Router>

    )

};

export default App;