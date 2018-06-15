import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Catalog from './catalog/app-catalog'
import Cart from './cart/app-cart'
import CatalogDetail from './product/app-catalog-detail'
import CatalogItem from './catalog/app-catalog-item';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Catalog}/>
      <Route path='/cart' component={Cart}/>
      <Route path='/item/:item' component= {CatalogDetail} />
    </Switch>
  </div>
)

export default Main