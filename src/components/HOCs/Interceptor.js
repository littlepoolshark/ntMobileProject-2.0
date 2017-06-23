import React, { Component } from 'react';
import Field from "../UIComponents/Field";
import INTERCEPTOR from "../utilities/interceptor.config";
import typeOf from "../utilities/typeOf";

function Interceptor(WrappedComponent){
    class Interceptor extends Component {

        proc(WrappedComponentInstance){
            if(WrappedComponentInstance){
                //WrappedComponentInstance.refs.field;
            }
        }

        interceptor=(event) => {
            let currValue=event.target.value;
            let {
                fieldName,
                interceptor,
                onChange
            }=this.props;
   
            if(interceptor && interceptor.length){
                interceptor.forEach((item,index) => {
                    if(typeOf(item) === "string"){
                        if(INTERCEPTOR.hasOwnProperty(item)){
                            currValue = INTERCEPTOR[item].call(null,currValue);
                        }else if(item.indexOf("maxLength") > -1){
                            let maxLength=parseInt(item.split(":")[1]);
                            currValue = INTERCEPTOR["maxLength"].call(null,currValue,maxLength);
                        }else if(item.indexOf("keepDecimalPlaceOf") > -1){
                            let n=parseInt(item.split(":")[1]);
                            currValue = INTERCEPTOR["keepDecimalPlaceOf"].call(null,currValue,n);
                        }
                        
                    }else if(typeOf(item) === "function"){
                        currValue = item.call(null,currValue);
                    }
                })
            }
            !!onChange && onChange(fieldName,currValue);
        }

        render(){
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
    Interceptor.displayName="FieldWithInterceptor";//wrap the display name for easy debugging

    return Interceptor;
};

export default Interceptor(Field);