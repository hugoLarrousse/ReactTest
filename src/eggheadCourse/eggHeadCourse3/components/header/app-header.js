import React from 'react'
import CartSummary from './app-cart-summary'
import { Link } from 'react-router-dom'


export default () => (
    <div className='row' style={{borderBottom: '1px solid #ccc'}}>
        <Link to='/' className='col-sm-2'><h1> Store</h1></Link>
        <div className='col-sm-10 text-right'>
            <CartSummary />
        </div>
    </div>
)