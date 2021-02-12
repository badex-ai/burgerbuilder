import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../components/store/actions'




export class burgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
    }

    // constructor(props){
    //     super(props)
    //     axios.get('https://burgerbuilder-59a73-default-rtdb.firebaseio.com/ingredients.json').then(
    //         response=>{
    //             console.log('yessoooooo')
    //             this.setState({ingredient:{...response.data}})
    //         }
    //     ).catch(error=>{} )
   // }   
    
    componentDidMount(){
        // axios.get('https://burgerbuilder-59a73-default-rtdb.firebaseio.com/ingredients.json').then(
        //     response=>{
        //         console.log('yessoooooo')
        //         this.setState({ingredients:{...response.data}})
        //     }
        // ).catch(error=>{ 
        //     this.setState({error: true})
        // })
    }

     updatePurchaseState=(ingredients)=>{
        
        const sum = Object.keys(ingredients).map(ingKey =>{
            return ingredients[ingKey];
        }).reduce((sum, curr)=>{return sum + curr},0);
        
        return sum > 0 
        
        
        
    }

    purchaseHandler =()=>{
        
        this.setState({purchasing: true})
    }

    closeModal = ()=>{
        this.setState({purchasing: false})
    }

    // addIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
      

      


    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
      
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
         
    // }
 
    purchaseContinueHandler=()=>{
        // this.setState({loading: true});
         

        // const queryParams =[];

        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&');
        // console.log(queryParams)
        this.props.history.push('/checkout' )
        
    }

    // removeIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount<=0){
    //         return 
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
       
    //     const priceToDeduct = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceToDeduct;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients}) 
    //     this.updatePurchaseState(updatedIngredients)
    // }
    render() {
        const disabledInfo={

            ...this.props.ings
        }
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;

        }
        
        
        

            let orderSummary = null ;
            let burger =this.state.error ? <p>Ingredient can't be loaded</p> : <Spinner/>
            if(this.props.ings){
                burger= <React.Fragment>
                            
                        <Burger ingredients= {this.props.ings}/>
                    
                        <BuildControls 
                            clicked={()=>this.purchaseHandler()}
                            purchasable ={!this.updatePurchaseState(this.props.ings)}
                            price={this.props.price}
                            disabled= {disabledInfo}
                            ingredientDeducted = {this.props.onRemoveIngredient} 
                            ingredientAdded = {this.props.onIngredientAdded}
                        />
                        

                         
                        

                        </React.Fragment>

                        orderSummary= <OrderSummary 
                        price ={this.props.price.toFixed(2)} 
                        clickHide={()=>{this.closeModal()}} clickCont ={()=>this.purchaseContinueHandler()}
                        ingredients={this.props.ings}
                    />
                        
                        if(this.state.loading){
                            orderSummary = <Spinner/>    
                            }
                
            }
        return (
            <div>
               
                    <Modal click={()=> this.closeModal()} show={this.state.purchasing}>
                        {orderSummary}
                    </Modal>
                    {burger}
                
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        ings: state.ingredients,
        price :state.totalPrice
       
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded : (ingName)=>{
            dispatch({type: actionTypes.ADD_INGREDIENTS,ingredientName:ingName })
        },

        onRemoveIngredient: (ingName)=>{
            dispatch({type: actionTypes.REMOVE_INGREDIENTS,ingredientName:ingName })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(burgerBuilder, axios))



