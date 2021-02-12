import React from 'react'
//import PropTypes from 'prop-types'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad' ,type: 'salad'},
    {label: 'Bacon' ,type: 'bacon'},
    {label: 'Cheese' ,type: 'cheese'},
    {label: 'Meat' ,type: 'meat'},

]

const BuildControls=  (props)=>{
    return (
        <div className={classes.BuildControls} >
            <p>Current Price:<strong> {props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>{
                return <BuildControl 
                 key={ctrl.label}
                  label={ctrl.label}
                  disabled = {props.disabled[ctrl.type]}
                  removed = {()=>props.ingredientDeducted(ctrl.type)} 
                  added = {()=>props.ingredientAdded(ctrl.type)}/>
                 })}
           <button onClick={props.clicked}
           disabled={props.purchasable} className={classes.OrderButton}>ORDER NOW</button>

        </div>
    )
}

//  BuildControls.propTypes = {

// }

export default BuildControls

