import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

export default function SideDrawer(props) {
    let attachedClasses =[classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses= [classes.SideDrawer, classes.Open]
    }
    return (
        <React.Fragment>
            <Backdrop clicked={props.closed} show={props.open}/>
        <div className = {attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
           
           <nav>
               <NavigationItems isAuthenticated = {props.isAuth}/>
           </nav>
        </div>
        </React.Fragment>
        
    )
}
