import React, { Component } from 'react';
import Field from "../UIComponents/Field";

function Validator(WrappedComponent){
    class Validator extends Component {
        componentDidMount(){
            console.log("into HOC componentDidMount");
        }

        render(){
            let {
                value,
                interceptor,
                ...otherProps
            }=this.props;

            if(interceptor && interceptor.length){
                interceptor.map((item,index) => {
                    if(item === "isNumber"){
                        value = value.replace(/[^\d\.]/g,"");
                    }else if( item === "length<11"){
                        value = value.slice(0,11);
                    }
                })
            }

            let newProps={
                value,
                ...otherProps
            };

            return <WrappedComponent {...newProps} />  
        }
    }
    Validator.displayName="FieldWithValidator";

    return Validator;
};

export default Validator(Field);