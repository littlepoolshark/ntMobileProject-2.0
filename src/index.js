import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import {  AppContainer } from "react-hot-loader";
import App from "./components/App";
import TodoStore from "./stores/todoStore";

let todoStore= new TodoStore();


const hotRender=(Component) => {
    render(
        <AppContainer>  
            	<Provider store={todoStore} >
					<Component />
				</Provider>
        </AppContainer>          
    ,document.getElementById("root"));
}

hotRender(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(() => {
    hotRender(App)
  });
}