import React from 'react'
import AppStore from '../../stores/app-store'
import StoreWatchMixin from '../../mixins/StoreWatchMixin'
import { Link } from 'react-router-dom'

const CartSummary = (props) => (
    <div style={{paddingTop:15}}>
        <Link to='/cart' className='btn btn-success'>
            { `Cart items: ${props.qty} / $${props.total}` }
        </Link>
    </div>
)


export default StoreWatchMixin(CartSummary, AppStore.getCartTotals)
