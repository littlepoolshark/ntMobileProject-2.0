import "../../../../css/UI/index.scss";
import "../../../../css/businessComponent/app.scss";
import React, { Component } from "react";
import { render } from "react-dom";
import { HashRouter as Router, Route, Link, NavLink, Redirect } from "react-router-dom";

import { Home } from "../index";
import { TabBar, Icon, NavBar } from "../../UIComponent/index";
import pageNameMap from "../../config/pageNameMap";



const App = (props) => {
    
    return (
        <Router>
            <div className="appContainer">
                <Route
                    path="/:component"
                    component={({ match }) => {

                        
                        let currComponent = match.params.component.slice(0, 1).toUpperCase() + match.params.component.slice(1);
                        let navBarTitle="";
                        let isNeedNavBar=true;

                        

                        if(!!pageNameMap[currComponent]){
                            navBarTitle=pageNameMap[currComponent].name;
                            isNeedNavBar=pageNameMap[currComponent].isNeedNavBar;                            
                        }

                         {/*<NavBar
                                title={navBarTitle}
                                amStyle="primary"
                                leftNav={[{ title: "返回", icon: "left-nav" }]}
                            /> */}

                        return (
                            isNeedNavBar ?
                            <nav className="nt-navBar">
                                <div className="nt-navBar-left"><Icon name="left-nav"/>返回</div>
                                <div className="nt-navBar-title">{navBarTitle}</div>
                                <div className="nt-navBar-right">分享</div>
                            </nav>:
                            null
                        )
                    }}
                />
                <div className="main">
                    <Route
                        exact
                        path="/home"
                        component={Home}
                    />
                </div>

                <Route
                    path="/:component"
                    component={({ match }) => {

                        let currComponent = match.params.component.slice(0, 1).toUpperCase() + match.params.component.slice(1);
                        let isFirstLevelPage = ["Home", "ProductList", "UserHome"].indexOf(currComponent) > -1;

                        return isFirstLevelPage ?
                            <TabBar
                                amStyle="white"
                            >
                                <TabBar.Item
                                    component={Link}
                                    title="首页"
                                    icon="home"
                                    selectedIcon="home"
                                    selected={currComponent === 'Home'}
                                    to="/home"
                                />
                                <TabBar.Item
                                    component={Link}
                                    title="理财"
                                    icon="person"
                                    selectedIcon="person"
                                    selected={currComponent === 'ProductList'}
                                    to="/productList"
                                />
                                <TabBar.Item
                                    component={Link}
                                    icon="person"
                                    selectedIcon="person"
                                    title="我的"
                                    selected={currComponent === 'UserHome'}
                                    to="/userHome"
                                />
                            </TabBar> :
                            null
                    }}
                />
            </div>
        </Router>

    )

};

export default App;