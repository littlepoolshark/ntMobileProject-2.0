import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from "../UIComponents/Field";

function Validator(WrappedComponent){
    return class extends Component {
        render(){
            return <WrappedComponent {...this.props} />  
        }
    }
};

export default Validator(Field);