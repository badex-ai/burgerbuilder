import React from 'react'
import classes from './Toolbar.css'  
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Hamburger from '../SideDrawer/Hamburger/Hamburger'


export default function Toolbar(props) {
    return (
        <header className={classes.Toolbar}>
           <Hamburger clicked={props.hamburgerClicked}/>
         <div className={classes.Logo}>
         <Logo/>
         </div>
            
           <nav className={classes.DesktopOnly}>
               <NavigationItems/>
           </nav>
        </header>
    )
} 
