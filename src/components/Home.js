import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import Button from "./UIComponents/Button";


@inject("store")
@observer
class Home extends Component {
    constructor(props){
        super(props);
        this.changeGlobalText=this.changeGlobalText.bind(this);
    }

    changeGlobalText(){
        let newText=this.refs.globalText.value;
        this.props.store.changeGlobalText(newText);
    }

    render() {
        return (
            <div>
                <img src={require("../image/test.jpg")} alt=""/>
                This is Home Page.<br/>
                <input type="text" ref="globalText"/>
                <Button amStyle="primary" block radius onClick={this.changeGlobalText}>change globalText</Button>
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;