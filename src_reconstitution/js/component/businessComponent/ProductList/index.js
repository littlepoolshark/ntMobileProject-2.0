import React, { Component } from 'react';
import PropTypes from 'prop-types';
import setDocumentTitle from "../../lib/setDocumentTitle";

class ProductList extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        return (
            <div>
                productList
            </div>
        );
    }

    componentDidMount(){
         setDocumentTitle("理财列表");
    }
}

ProductList.propTypes = {

};

export default ProductList;