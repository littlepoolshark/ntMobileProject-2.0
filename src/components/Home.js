import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";


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
                This is Home Page.<br/>
                <input type="text" ref="globalText"/>
                <button onClick={this.changeGlobalText}>change globalText</button>
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;