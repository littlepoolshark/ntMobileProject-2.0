import "../style/app.scss";
import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";

import Home from "./Home";
import Todo from "./Todo";


const App = (props) => {
    return (
        <Router>
            <div style={{ textAlign: "center" }}>
                <NavLink to="/home" activeStyle={{color:"red"}}>go to Home</NavLink><br/>
                <NavLink to="/todo" >go to Todo</NavLink><br/>
                <NavLink to="/test" >go to Test</NavLink>
                <Redirect from="/test" to="/home" />

                <Route
                    exact
                    path="/todo"
                    component={Todo}
                />
                <Route
                    exact
                    path="/home"
                    component={Home}
                />
                <Route
                    path="/:component"
                    component={({ match }) => <div >componentName:{match.params.component}</div>}
                />

                 <Route
                    path="/test"
                    render={({ match }) => {
                        console.log('match:',match)
                        return (
                            <div >{[<div key="1">1</div>,<div key="2">2</div>]}</div>
                        )
                    }}
                />

            </div>
        </Router>

    )

};

export default App;