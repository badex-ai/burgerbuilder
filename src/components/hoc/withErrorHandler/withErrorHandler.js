//import React from 'react'
import React, { Component } from 'react'
import Modal from '../../UI/Modal/Modal'

// const withErrorHandler = (WrappedComponent,axios)=>{
//     return (props)=>{
//         return (
//            < React.Fragment>
//            <Modal show>
//                Something didn't work!
//            </Modal>
//             <WrappedComponent {...props} />
//            </React.Fragment>
            
            
//         )
//     }
// }

// export default withErrorHandler



const withErrorHandler = (WrappedComponent, axios)=>{
   return class extends Component {
       state = {
           error: null
       } 

       //THIS INTERCEPTORS ARE FOR CHECKING IF ERROR OCCURRED WHILE SENDING OR RECIEVING HTTP REQ OR RES
       constructor(props){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => { 
                this.setState({error:null})
                return req
            }) 
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
              this.setState({error: error})
            } )
       }
    //    componentDidMount(){
    //        axios.interceptors.request.use(req => { 
    //            this.setState({error:null})
    //            return req
    //        }) 
    //        axios.interceptors.response.use(res => res, error => {
    //          this.setState({error: error})
    //        } )
    //    }
    componentWillUnmount(){
       // console.log('Will unmount',this.reqInterceptor, this.resInterceptor)
        axios.interceptors.request.eject(this.reqInterceptor)
        axios.interceptors.response.eject(this.resInterceptor)
    }

       errorConfirmedHandler=()=>{
           
           this.setState({error:null})
       }

        render() {
            return ( 
                < React.Fragment>
                            <Modal click={this.errorConfirmedHandler} show = {this.state.error}>
                              {this.state.error ? this.state.error.message : null}
                            </Modal> 
                            <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}


export default withErrorHandler


