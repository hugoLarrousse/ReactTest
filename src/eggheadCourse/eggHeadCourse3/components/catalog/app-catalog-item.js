import React from 'react';
import AppActions from '../../actions/app-actions'
import CartButton from './../cart/app-cart-button'
import { Link } from 'react-router-dom'

const CatalogItem = (props) => (
    <div className='col-xs-6 col-sm-4 col-md-3'>
    <h4> { props.item.title } </h4>
    <img src="http://placehold.it/250x250" alt='this is a widget' width="100%" className="img-responsive"/>
        <p>{props.item.summary}</p>
        <p>cost: ${props.item.cost}</p><span style={{color: 'green'}}> {props.item.qty && `qty: ${props.item.qty} in Cart`}</span>
        <br/>
        <div className='btn-group'>
        <Link to={`/item/${props.item.id}`} className='btn btn-default btn-sm'> Learn More </Link>
        <CartButton
            handler={AppActions.addItem.bind(null, props.item)}
            txt= 'Add to Cart'
        />
        </div>
    </div>
)

export default CatalogItem