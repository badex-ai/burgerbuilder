import * as actionTypes from '../actions/actionTypes' ;
import {updateObject} from '../../shared/utility'

const INGREDIENT_PRICES = {
    totalPrice: 4,
    salad: 0.5,
    cheese: 0.6,
    meat: 0.3, 
    bacon: 0.7
}

const initialState = {
    ingredients:null,
    totalPrice: 4,
    error: false,
    building: false
}

const addIngredient= (state,action)=>{
    const updatedIngredientAdd = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredientsAdd = updateObject(state.ingredients,updatedIngredientAdd)
    const updatedStateAdd= {
       ingredients: updatedIngredientsAdd,
       totalPrice :state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
       building: true           
       }
       return updateObject(state, updatedStateAdd)
}

const removeIngredient=(state, action)=>{
    const updatedIngredientSub = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
        const updatedIngredientsSub = updateObject(state.ingredients,updatedIngredientSub)
        const updatedStateSub= {
           ingredients: updatedIngredientsSub,
           totalPrice :state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
           building: true           
           }
           
        return updateObject(state, updatedStateSub)
}

const setIngredient=(state, action)=>{
    return updateObject(state,{
        ...state,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false
    })
}
const fetchIngredientsFailed= (state, action)=>{
    return updateObject(state,{error: true})
}

const reducer=(state= initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action)
       
        case actionTypes.REMOVE_INGREDIENTS:return removeIngredient(state, action)
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:return fetchIngredientsFailed(state,action)
              
        case actionTypes.SET_INGREDIENTS: return setIngredient(state,action)
            
             

        default : return state;
    }
};

export default reducer
