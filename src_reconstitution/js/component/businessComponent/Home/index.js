import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slick, SlickItem, Picker } from "../../UIComponent/index";
import setDocumentTitle from "../../lib/setDocumentTitle";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueGroups: {
                loanType: '个人',
                loanUserNames: '种植贷',
            },
            optionGroups: {
                loanType: ['个人', '企业'],
                loanUserNames: ['经销商贷', '零销贷', '种植贷', '惠农贷', "年轻e贷"],
            },
            isPickerOpen:false,
            anotherField:""
        };
    }

    _openPicker=() => {
        this.setState({
            isPickerOpen:true
        })
    }

    _closePicker=() => {
        this.setState({
            isPickerOpen:false
        })
    }
    
    handleFinished=() => {
        this.setState({
            anotherField:this.state.valueGroups.loanUserNames,
            isPickerOpen:false
        })
    }

    handleChange = (name, value) => {
        this.setState(({ valueGroups }) => {
            if (name === "loanType" && value !== valueGroups.loanType) {
                let currLoanUserNames =['经销商贷', '零销贷', '种植贷', '惠农贷', "年轻e贷"];
                switch(value){
                    case "个人":
                        currLoanUserNames=['经销商贷', '零销贷', '种植贷', '惠农贷', "年轻e贷"];
                    break;
                    case "企业":
                        currLoanUserNames=['企业借款', '担保机构'];
                    break;
                    default:
                    break;
                }
                return {
                    valueGroups: {
                        ...valueGroups,
                        loanType:value,
                        loanUserNames:value === "个人" ? "种植贷" : "企业借款"
                    },
                    optionGroups:{
                        loanType: ['个人', '企业'],
                        loanUserNames:currLoanUserNames
                    }
                }
            }else {
                return {
                    valueGroups: {
                        ...valueGroups,
                        [name]: value
                    }
                }

            }

        });
    }

    render() {
        const { optionGroups, valueGroups, anotherField } = this.state;

        return (
            <div id="homeContainer">
                <Slick isAutoPlay={false}>
                    <SlickItem><img src={require("../../../../img/banner1.jpg")} alt="" /></SlickItem>
                    <SlickItem><img src={require("../../../../img/banner2.jpg")} alt="" /></SlickItem>
                    {/* <SlickItem><img src={require("../../../../img/banner3.jpg")} alt="" /></SlickItem> */}
                </Slick>
                <div>你的选择结果是：{anotherField}</div>
                <button onClick={this._openPicker}>打开picker</button>
                <Picker
                    isOpen={this.state.isPickerOpen}
                    optionGroups={optionGroups}
                    valueGroups={valueGroups}
                    onChange={this.handleChange} 
                    onFinished={this.handleFinished}
                />
            </div>
        );
    }
    componentDidMount() {
       setDocumentTitle("首页");
    }
}

Home.propTypes = {

};

export default Home;