import React from 'react';
import AppActions from '../actions/app-actions'
import CartButton from './app-cart-button'

const CatalogItem = (props) => (
    <div className='col-xs-6 col-sm-4 col-md-3'> 
    <h4> { props.item.title } </h4>
    <img src="http://placehold.it/250x250" alt='this is a widget' width="20%" className="img-responsive"/>
        <p>{props.item.summary}</p>
        <p>cost: ${props.item.cost}</p><span style={{color: 'green'}}> {props.item.qty && `qty: ${props.item.qty} in Cart`}</span>
        <br/>
        <CartButton
            handler={AppActions.addItem.bind(null, props.item)}
            txt= 'Add to Cart'
        />
    </div>
)

export default CatalogItem