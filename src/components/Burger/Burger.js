import React from 'react'
//import PropTypes from 'prop-types'
import BurgerIngredients from './BurgerIngredient/BurgerIngredients';
import classes from './Burger.css';

// we can get the routing params to the props by using 
// import {withRouter} from 'react-router-d om';

function Burger(props){
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        return[...Array(props.ingredients[ingKey])].map((_,i)=>{
            return <BurgerIngredients key={ingKey + i} type={ingKey}/>
        })
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length=== 0){
        transformedIngredients= <p>Please start adding ingredients!</p>
    }
    return (
        <div  className= {classes.Burger} >
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    )
}

// Burger.propTypes = {

// }

export default Burger
// Then wrap the higher order component with the 
// export default withRouter(Burger)

