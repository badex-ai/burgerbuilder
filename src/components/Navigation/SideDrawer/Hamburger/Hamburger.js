import React from 'react'
import classes from './Hamburger.css';

export default function Hamburger(props) {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
