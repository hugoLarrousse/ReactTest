import React from 'react'
import AppStore from '../../stores/app-store'
import StoreWatchMixin from '../../mixins/StoreWatchMixin'
import { Link, Redirect } from 'react-router-dom'
import AppActions from '../../actions/app-actions'
import CartButton from './../cart/app-cart-button'

const getCatalogItem = (props) => {
    return { item: AppStore.getCatalog().find(item => item.id === props.match.params.item) }
}

const CatalogDetail = (props) => (
    props.item ?
    <div> 
    <h4> { props.item.title } </h4>
    <img src="http://placehold.it/250x250" alt='this is a widget'/>
        <p>{props.item.description}</p>
        <p>cost: ${props.item.cost}</p>
        <span style={{color: 'green'}}> {props.item.qty && `qty: ${props.item.qty} in Cart`}</span>
        <br/>
        <div className='btn-group'>
            <Link to='/' className='btn btn-default btn-sm' > Continue Shopping </Link>
            <CartButton
                handler={AppActions.addItem.bind(null, props.item)}
                txt= 'Add to Cart'
            />
        </div>
    </div>
    : <Redirect to='/'/>
)

export default StoreWatchMixin(CatalogDetail, getCatalogItem)