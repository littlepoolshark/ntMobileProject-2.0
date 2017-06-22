import React, { Component } from 'react';
import Field from "../UIComponents/Field";
import INTERCEPTOR from "../utilities/interceptor.config";
import typeOf from "../utilities/typeOf";

function Validator(WrappedComponent){
    class Validator extends Component {

        proc(WrappedComponentInstance){
            if(WrappedComponentInstance){
                WrappedComponentInstance.refs.field;
                console.log('WrappedComponentInstance.refs.field.value:',WrappedComponentInstance.refs.field.value);
            }
        }

        interceptor=(event) => {
            let currValue=event.target.value;
            let {
                fieldName,
                interceptor,
                onChange
            }=this.props;
   
            console.log('fieldName:',fieldName)

            if(interceptor && interceptor.length){
                //debugger;
                interceptor.forEach((item,index) => {
                    console.log(INTERCEPTOR.hasOwnProperty(item))
                    //debugger;
                    if(typeOf(item) === "string"){
                        if(INTERCEPTOR.hasOwnProperty(item)){
                            currValue = INTERCEPTOR[item].call(null,currValue);
                        }else if(item.indexOf("maxLength") > -1){
                            
                            let maxLength=parseInt(item.split(":")[1]);
                            console.log(maxLength)
                            currValue = INTERCEPTOR["maxLength"].call(null,currValue,maxLength);
                        }
                        
                    }else if(typeOf(item) === "function"){
                        currValue = item.call(null,currValue);
                    }
                })
            }
            !!onChange && onChange(fieldName,currValue);
        }

        componentDidMount(){
            
        }

        componentDidUpdate(){
            console.log("into update")
        }

        render(){
            console.log("into render")
            let {
                interceptor,
                onChange,
                fieldName,
                ...otherProps
            }=this.props;

            let newProps={
                ...otherProps,
                onChange:this.interceptor,
                ref:this.proc.bind(this)
                //通过向wrappedComponent组件的ref属性传递一个回调函数来取得wrappedComponent组件的实例WrappedComponentInstance
                //然后通过WrappedComponentInstance的refs属性来访问真实的DOM节点
            };

            return <WrappedComponent {...newProps} />  
        }
    }
    Validator.displayName="FieldWithValidator";//wrap the display name for easy debugging

    return Validator;
};

export default Validator(Field);