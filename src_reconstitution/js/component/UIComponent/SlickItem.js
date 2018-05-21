import React, { Component, PropTypes } from 'react';

let  SlickItem =(props) => {
        return (
            <li>
                {props.children}
            </li>
        );
}

SlickItem.propTypes = {
    children:PropTypes.node
};

export default SlickItem;