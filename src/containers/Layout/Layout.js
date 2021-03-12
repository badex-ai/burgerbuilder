
// layout is an higher order component 


import React,{ Component } from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'


 
class Layout extends Component {
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
        <Toolbar
        isAuth={this.props.isAuthenticated}
        hamburgerClicked={this.openToolbar}/>
        <SideDrawer 
        isAuth={this.props.isAuthenticated}
        open={this.state.showSideDrawer} closed={()=>this.SideDrawerClosedHandler()}/>
        <main className = {classes.Content}> 
        
         {this.props.children}
         </main> 
        </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        isAuthenticated : state.auth.token !== null
    }
    
}
export default connect(mapStateToProps)(Layout)







