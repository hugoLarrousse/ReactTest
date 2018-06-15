import React from 'react'
import ReactDOM from 'react-dom';
import Catalog from './catalog/app-catalog'
import Cart from './cart/app-cart'
import Template from './template/app-template'
import { BrowserRouter, Route } from 'react-router-dom'


// <Route exact path="/" component={Template}/>
//                 <Route exact path="/" component= {Catalog}/>
//                 <Route path="cart" component={Cart}/>

export class AppEggHead3 extends React.Component {
    display() {
        ReactDOM.render(
            <BrowserRouter>
                <Template/>
            </BrowserRouter>
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