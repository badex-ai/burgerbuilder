import React, { Component } from 'react'
import Input from  '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../components/store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import {updateObject, checkValidity} from '../../components/shared/utility'


export class Auth extends Component {
    state = {
        controls:  {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6 
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount(){
         if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
         }
    }

   

    inputChangedHandler=(event,controlName) => {
       // console.log(event.target.value); 
        const updatedControls = updateObject(this.state.controls,{
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
              }
        })
        
        this.setState({controls: updatedControls}); 
       

    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
             return {isSignUp: !prevState.isSignUp}
        })
    }

    submitHandler=(event)=>{
        event.preventDefault();
      //  console.log('release one');
        // this.props.onInitIngredients()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
   // console.log(this.state.controls.email.value, this.state.controls.password.value)
    }


    render() {
        const formElementsArray=[];
        for (let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config: this.state.controls[key]
            })
        }

      //  console.log(formElementsArray);
        let form = formElementsArray.map(formElement=>{ 
          return  <Input
            key={formElement.id}
            elementType={formElement.config.elementtType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched ={formElement.config.touched}
            changed = {(event)=>{this.inputChangedHandler(event,formElement.id)}}
            />
            
        })

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage= null;
        if(this.props.error){
            errorMessage= (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
          //  console.log(this.props)
           // console.log(this.props.authRedirectPath)
            authRedirect= <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType= 'Success'>
                        Submit
                    </Button>
                </form>
                <Button clicked={this.switchAuthModeHandler} btnType= 'Danger'>Switch to {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated : state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath

    }
}

const mapDispatchToProps = dispatch => {
    return {
      
        onAuth : (email,password,isSignUp) =>  { dispatch(actions.auth(email, password,isSignUp))},
        onSetAuthRedirectPath: ()=>{dispatch(actions.setAuthRedirectPath('/'))}
        
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
