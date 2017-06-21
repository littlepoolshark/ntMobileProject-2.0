import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from "mobx-react";
import Button from "./UIComponents/Button";
//import DatePicker from "react-mobile-datepicker";


@inject("store")
@observer
class Home extends Component {
    constructor(props){
        super(props);
        this.changeGlobalText=this.changeGlobalText.bind(this);
        this.state={
            time:new Date(),
            isOpen:false
        }
    }

    changeGlobalText(){
        let newText=this.refs.globalText.value;
        this.props.store.changeGlobalText(newText);
    }

    handleOpenDatePicker=() => {
        this.setState({
           isOpen: true
        })
    }

    handleCancel = () => {
		this.setState({ isOpen: false });
	}

	handleSelect = (time) => {
		this.setState({ time, isOpen: false });
	}

    dateFormater(time){
        return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`;
    }

    render() {
        //console.log(this.state.time);

        return (
            <div>
                <img src={require("../image/test.jpg")} alt=""/>
                {this.dateFormater(this.state.time)}<br/>
                <input type="text" ref="globalText"/>
                <Button amStyle="primary" block radius onClick={this.handleOpenDatePicker}>change globalText</Button>
                {/*<DatePicker
					value={this.state.time}
					isOpen={this.state.isOpen}
					onSelect={this.handleSelect}
					onCancel={this.handleCancel} 
                    theme="ios"
                    dateFormat={["YYYY","M","D"]}
                />*/}
            </div>
        );
    }
}

Home.propTypes = {

};

export default Home;