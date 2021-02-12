import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import Checkout from './containers/checkout/Checkout';
import Orders from './containers/Layout/Orders/Orders'


export class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/orders" component = {Orders} /> 
              <Route path="/checkout" component = {Checkout}/>
              <Route path="/" exact  component = {BurgerBuilder}/>
              
            </Switch>
            {/* <BurgerBuilder/>
            <Checkout/> */}
          </Layout>
        </BrowserRouter>
        
      </div>
    )
  }
}

export default App
