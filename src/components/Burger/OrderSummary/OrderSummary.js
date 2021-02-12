import React, { Component } from 'react'
import Button from '../../UI/Button/Button'





export default class OrderSummary extends Component {

    componentDidUpdate(){
        console.log("it just updated the orderSummary")
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igkey=>{
                return <li key={igkey}>
                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>:
                    {this.props.ingredients[igkey]}
                    </li>
            }
        )
        return (
            <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Totoal Price: {this.props.price}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType='Danger' clicked={this.props.clickHide}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.clickCont}>CONTINUE</Button>
            
        </React.Fragment>
        )
    }
}

// export default function OrderSummary(props) {
//     const ingredientSummary = Object.keys(props.ingredients).map(
//         igkey=>{
//             return <li key={igkey}>
//                 <span style={{textTransform: 'capitalize'}}>{igkey}</span>:
//                 {props.ingredients[igkey]}
//                 </li>
//         }
//     )
    
//     return (
//         <React.Fragment>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Totoal Price: {props.price}</strong></p>
//             <p>Continue to checkout</p>
//             <Button btnType='Danger' clicked={props.clickHide}>CANCEL</Button>
//             <Button btnType='Success' clicked={props.clickCont}>CONTINUE</Button>
            
//         </React.Fragment>
//     )
// }