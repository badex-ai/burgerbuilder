import * as actionTypes from '../actions/actionTypes'
import axios from '../../../axios-orders'

export const addIngredient=(name)=>{
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}
export const removeIngredient=(name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}
export const setIngredients=(ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = ()=>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients =()=>{
    return dispatch =>{
        axios.get('https://burgerbuilder-59a73-default-rtdb.firebaseio.com/ingredients.json').then(
            response=>{
               // console.log('yessoooooo')
                dispatch(setIngredients(response.data))
            }
        ).catch(error=>{ 
          dispatch(fetchIngredientsFailed()) 
        })

    }
}

