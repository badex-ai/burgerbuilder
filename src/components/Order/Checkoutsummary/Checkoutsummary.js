
import React from 'react';
 import Burger from '../../Burger/Burger';
 import Button from '../../UI/Button/Button';
 import classes from './Checkoutsummary.css';


 export default function Checkoutsummary(props) {
     
   

     return (
         <div className = {classes.Checkoutsummary}>
             <h1>We hope it tates well!</h1>
             <div style={{width:'100%',margin: 'auto' }}>
                 <Burger ingredients={props.ingredients}/>
             </div>
             <Button
             clicked={props.checkoutCancelled}
             btnType="Danger">Cancel</Button>
             <Button 
              clicked={props.checkoutContinued}
             btnType="Success">Success</Button>
         </div>
     )
 }
 