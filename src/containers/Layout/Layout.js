
// layout is an higher order component 


import React,{ Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

export default class Layout extends Component {
    state = {
        showSideDrawer: false
    }
     openToolbar=()=>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
        
     }

    SideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer: false})
    }

    render() {
        return (
            <React.Fragment>
        <Toolbar hamburgerClicked={this.openToolbar}/>
        <SideDrawer  open={this.state.showSideDrawer} closed={()=>this.SideDrawerClosedHandler()}/>
        <main className = {classes.Content}> 
        
         {this.props.children}
         </main> 
     </React.Fragment>
        )
    }
}








