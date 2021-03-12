import React from 'react'
import classes from './Input.css'

export default function Input(props) {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
   // console.log("input invalidity:" + props.invalid);
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid )
    }
    switch(props.elementType){
        case('input'):
        inputElement= <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig}  value={props.value}/>;
        break;
        case('textArea'):
        inputElement =<textarea  onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>;
        break;
        case('select'):
        inputElement= (
        <select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
            {props.elementConfig.options.map(option=>{
              //  console.log(option)
                return <option  key={option.value} value={option.value}>
                   { option.displayValue}
                </option>
            })}
        </select>);
        break;
        default: 
            inputElement=<input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
    }
     
    return (
        <div className={classes.Input}>
         <label className={classes.Label}>{props.label}</label>  
         {inputElement} 
        </div>
    )
}
