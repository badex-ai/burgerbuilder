import React, { Component } from 'react';
import Checkoutsummary from '../../components/Order/Checkoutsummary/Checkoutsummary';
import {Route} from 'react-router-dom'; 
import ContactData from '../../containers/checkout/ContactData/ContactData'
import {connect } from 'react-redux'

export class checkout extends Component {
    // state={
    
    //     ingredients:{},
    //     price: 0
    // }
    // componentDidMount(){
    //     const query= new URLSearchParams(this.props.location.search);
    //  //   console.log(query.entries())
    //     const ingredients= {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if (param[0]==='price'){
    //             price = param[1] ;
    //         }else{
    //             ingredients[param[0]] = +param[1]
    //         }
    //         console.log(param)
             
    //     }
    //    // this.setState({})
    //     this.setState({ingredients: ingredients, totalPrice:price})
    // }
    checkoutCancelled=()=>{
        this.props.history.goBack()
        //console.log(this.props.match.params)

    }
    checkoutContinued=()=>{
        this.props.history.replace("/checkout/contact-data")
        console.log('continued')
    }
     
    render() {
        return (
            <div>
            <Checkoutsummary checkoutContinued={this.checkoutContinued} checkoutCancelled ={this.checkoutCancelled}ingredients={this.props.ings}/>    
           <Route 
                path={this.props.match.path  + '/contact-data'} 
                //we passed a copy of props into this so that we can 
                component={ContactData}
            />
               
          
            </div>

        )
    }
}

const mapStateToProps=(state)=>{
return{
    ings: state.ingredients,
 
}
}

export default connect(mapStateToProps)(checkout)
