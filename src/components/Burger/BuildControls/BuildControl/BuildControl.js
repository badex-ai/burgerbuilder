import React from 'react'
//import PropTypes from 'prop-types'
import classes from './BuildControl.css'


function BuildControl(props) {
    return (  
        <div className={classes.BuildControl}>
            <div className = {classes.Label}>
            {props.label}
            </div>
            <button disabled={props.disabled} onClick={props.removed} className= {classes.Less}>Remove</button>
            <button onClick={props.added} className= {classes.More}>Add</button>
            
        </div>
    )
}

// BuildControl.propTypes = {

// }

export default BuildControl

