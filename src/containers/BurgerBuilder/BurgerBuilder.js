import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as burgerBuilderActions from '../../components/store/actions/index'




 export class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing : false,
        
    }

   
    
    componentDidMount(){
        this.props.onInitIngredients()
    }

    updatePurchaseState=(ingredients)=>{
        
        const sum = Object.keys(ingredients).map(ingKey =>{
            return ingredients[ingKey];
        }).reduce((sum, curr)=>{return sum + curr},0);
        
        return sum > 0 
        
        
        
    }

    purchaseHandler =()=>{
    if(this.props.isAuthenticated){
        this.setState({purchasing: true})
    }else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth')
    }
        
        
    }

    closeModal = ()=>{
        this.setState({purchasing: false})
    }

   
 
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
        
    }

   
    render() {
        const disabledInfo={

            ...this.props.ings
        }
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;

        }
        
        
        

            let orderSummary = null ;
            let burger =this.props.error ? <p>Ingredient can't be loaded</p> : <Spinner/>
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
                            isAuth= {this.props.isAuthenticated}
                        />
                        

                         
                        

                        </React.Fragment>

                        orderSummary= <OrderSummary 
                        price ={this.props.price.toFixed(2)} 
                        clickHide={()=>{this.closeModal()}} clickCont ={()=>this.purchaseContinueHandler()}
                        ingredients={this.props.ings}
                    />
                        
                        
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
        ings: state.burgerBuilder.ingredients,
        price :state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
       
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded : (ingName)=>{
            dispatch(burgerBuilderActions.addIngredient(ingName))
        },

        onRemoveIngredient: (ingName)=>{
            dispatch(burgerBuilderActions.removeIngredient(ingName))
        },
        onInitIngredients: ()=>{
            dispatch(burgerBuilderActions.initIngredients())
        },
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=>{
            dispatch(burgerBuilderActions.setAuthRedirectPath(path))
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))



