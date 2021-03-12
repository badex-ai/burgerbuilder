//import React from 'react';
import classses from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'




import React, { Component } from 'react'

export default class Modal extends Component {
   
    //this will define the condition for the component to update
shouldComponentUpdate(nextProps, nextState){

        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    
}  

componentDidUpdate(){
   // console.log('Modal Updated')
}
    render() {
        return (
            <React.Fragment>
                
                        <Backdrop clicked={this.props.click} show ={this.props.show}/>
                      <div className={classses.Modal}
                    style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)', opacity: this.props.show ? '1': '0'}
                   }>
                        {this.props.children}
                  </div>
                </React.Fragment>
        )
    }
}


// function Modal(props) {
//     return (
//         <React.Fragment>
//             <Backdrop clicked={props.click} show ={props.show}/>
//             <div className={classses.Modal}
//         style={{transform: props.show ? 'translateY(0)': 'translateY(-100vh)', opacity: props.show ? '1': '0'}
//         }>
//             {props.children}
//         </div>
//         </React.Fragment>
        
//     )
// }

// export default React.memo(Modal)
