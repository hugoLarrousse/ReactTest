import React from 'react'
import ReactDOM from 'react-dom';
import Catalog from './catalog/app-catalog'
import Cart from './cart/app-cart'

export class AppEggHead3 extends React.Component {
    display() {
        ReactDOM.render(
            <div>
                <Catalog/>
                <Cart />
            </div>
            ,document.getElementById('root'))
    }
    render() {
        // return <h1 onClick={AppActions.addItem.bind(null, 'this is an item')}> A flux App </h1>``
        return (
            <div className='container'>
            <h1 onClick={this.display}> A flux App </h1>
            </div>
        )
    }
}