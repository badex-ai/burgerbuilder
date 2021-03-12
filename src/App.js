import React, { Component,Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter ,Route,Switch,Redirect} from 'react-router-dom';
 import Checkout from './containers/checkout/Checkout';
// import Orders from './containers/Layout/Orders/Orders'
//  import Auth from './containers/Auth/Auth'
 import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux';
import * as actions from './components/store/actions/index'


 //const AsyncCheckout = React.lazy(() => import('./containers/checkout/Checkout'))
const AsyncOrders = React.lazy(() => import('./containers/Layout/Orders/Orders'))
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'))

export class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {

    let routes =(
          <Switch>
              {/* <Route path="/auth" component={Auth}/> */}
             
              <Route path="/auth" render={() => 
              (<Suspense fallback={<h1>Still Loading…</h1>}>
              <AsyncAuth/>
              </Suspense>)}/>
            

              <Route path="/" exact component = {BurgerBuilder}/> 
              <Redirect to="/" />
             
          </Switch>
             
    );
    if (this.props.isAuthenticated){
      routes =(
          <Switch>
              {/* <Route path="/checkout"  render={() => 
              (<Suspense fallback={<h1>Still Loading…</h1>}>
              <AsyncCheckout/>
              </Suspense>)}/> */}

              <Route path="/auth" render={() => 
              (<Suspense fallback={<h1>Still Loading…</h1>}>
              <AsyncAuth/>
              </Suspense>)}/>
              
             <Route path="/checkout" component={Checkout}/>
              {/* <Route path="/auth" component={Auth}/>
              <Route path="/orders" component={Orders}/>  */}

              <Route  path="/orders" render={() => 
              (<Suspense fallback={<h1>Still Loading…</h1>}>
              <AsyncOrders/>
              </Suspense>)} />
               
              
              <Route path="/logout" component={Logout}/> 
              <Route path="/" exact  component = {BurgerBuilder}/> 
              <Redirect to="/" />
          </Switch>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <Layout>
            {routes}
            {/* <BurgerBuilder/>
            <Checkout/> */}
          </Layout> 
        </BrowserRouter>
        
      </div>
    )
  }
}

const mapStateToProps = state=>{
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
