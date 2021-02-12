import React from 'react'
import classes from './NavigationItem.css';
import { NavLink} from 'react-router-dom';

export default function NavigationItem(props) {
    return (
        <li className= {classes.NavigationItem}>
            <NavLink
                activeClassName={classes.active}
                exact={props.exact}
                to={props.link} >
                {props.children}
            </NavLink> 
        </li>
    )
}
