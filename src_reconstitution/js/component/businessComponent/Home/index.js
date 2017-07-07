import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slick, SlickItem } from "../../UIComponent/index";

class Home extends Component {
    render() {
        return (
            <div id="homeContainer">
                <Slick>
                   <SlickItem><img src={require("../../../../img/banner1.jpg")} alt=""/></SlickItem>
                   <SlickItem><img src={require("../../../../img/banner2.jpg")} alt=""/></SlickItem>
                   <SlickItem><img src={require("../../../../img/banner3.jpg")} alt=""/></SlickItem>
                </Slick>
            </div>
        );
    }
    componentDidMount(){
        // document.getElementById("homeContainer").addEventListener("touchstart",(event) => {
        //     console.log("into touchstart")
        //     console.log(event.touches[0].pageY);
        // })
        // document.getElementById("homeContainer").addEventListener("touchmove",(event) => {
        //     document.getElementById("show").innerText=event.touches[0].pageY;
        // })
    }
}

Home.propTypes = {

};

export default Home;