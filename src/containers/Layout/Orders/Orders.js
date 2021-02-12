import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import classes from './Orders.css'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state= {
        orders: [],
        loading: true
    }

    componentDidMount(){
       
       axios.get('/orders.json').then((res)=>{
           console.log(res)

        
        const fetchedOrders = [];
        for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            })
        }
        this.setState({orders: fetchedOrders})
        console.log(this.state.orders)
       }).catch(error=>{
        this.setState({loading: false},{loading: false}) 
        
       })
    }
    render() {
       const orders = this.state.orders.map((order)=>{ return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>});
   
        return (
            <div className={classes.Orders}>
                
                {orders}
            
                
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios)
