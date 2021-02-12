import React from 'react'
import classes from './Order.css'

export default function Order(props) {
    const ingredients = [];
    for(let ingredientName in props.ingredients){
        ingredients.push({name: ingredientName,amount: props.ingredients[ingredientName]})
    }

    const ingredientOutput = ingredients.map(ingredient=>{return <span style={{textTramsform: 'Capitalize',display: 'inline-block', margin:'0 8px ',border: '1px solid #ccc',padding:'5px'}} key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span> })
    return (
        <div className= {classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}  
    