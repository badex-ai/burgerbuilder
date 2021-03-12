import React, { Component } from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'; 
import Checkoutsummary from '../../components/Order/Checkoutsummary/Checkoutsummary';

import ContactData from '../../containers/checkout/ContactData/ContactData'
import {connect } from 'react-redux'
import * as actions from '../../components/store/actions/index'

export class checkout extends Component {
    componentDidMount(){
        this.props.onInitPurchase()
    }

    checkoutCancelled=()=>{
        this.props.history.goBack()
        //console.log(this.props.match.params)

    }
    checkoutContinued=()=>{
        this.props.history.replace("/checkout/contact-data")
       // console.log('continued')
    }
     
    render() {
        let summary =<Redirect to="/"/>
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to ="/"/>: null
            summary = ( 
            <div>
            {purchasedRedirect}
            <Checkoutsummary 
            checkoutContinued={this.checkoutContinued} 
            checkoutCancelled ={this.checkoutCancelled}
            ingredients={this.props.ings}/>    

            <Route 
                path={this.props.match.path  + '/contact-data'} 
                //we passed a copy of props into this so that we can 
                component={ContactData}
            />
            
            </div>
            )
            
        }
        return summary
         
        
    }
}

const mapStateToProps=(state)=>{
return{
    ings: state.burgerBuilder.ingredients,
    purchased : state.order.purchased
 
}
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onInitPurchase: ()=>{dispatch(actions.purchaseInit())}   
     }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(checkout))
