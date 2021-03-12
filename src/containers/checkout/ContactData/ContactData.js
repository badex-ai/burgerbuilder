import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../components/store/actions/index'
import {updateObject,checkValidity} from '../../../components/shared/utility'

export class ContactData extends Component {
    state={
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation :{
                        required:true
                    },
                    valid:false,
                    touched: false
                    },
                street :  {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation :{
                        required:true
                    },
                    valid:false,
                    touched: false
                      },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation :{
                        required:true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid:false,
                    touched: false
                          },
                country:  {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation :{
                        required:true
                    },
                    valid:false,
                    touched: false
                         },
                email:  {
                    elementType: 'input',
                    elementConfig: {
                        type:'email',
                        placeholder: 'Your email'
                    },
                    value: '',
                    validation :{
                        required:true
                    },
                    valid:false,
                    touched: false
                         },
                deliveryMode:  {
                    elementType: 'select',
                    elementConfig: {
                       options: [
                           { value: 'fastest', displayValue:'Fastest'},
                            { value: 'cheapest', displayValue:'Cheapest'}
                    ]},
                    value: 'fastest',
                   // validation:{},
                    valid: true,
                    
                    
            }
        },
        formIsValid: false,
    

    }

   

    inputChangedHandler=(event,inputIdentifier)=>{
       // console.log(event.target.value); 
        // const updatedOrderForm ={
        //     ...this.state.orderForm
        // }

        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            touched: true,
            value: event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        })

        const updatedOrderForm = updateObject(this.state.orderForm, {[inputIdentifier]: updatedFormElement})

        // const updatedFormElement ={
        //     ...updatedOrderForm[inputIdentifier]
        // };
        // updatedFormElement.touched= true;
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid= this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
         //console.log(updatedFormElement.value)
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid= true;
        for(let inputIdentifiers in updatedOrderForm){
          //  console.log(inputIdentifiers)
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid 
        }
 
        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid })

        

    }

    orderHandler=(event)=>{
       
        event.preventDefault();
        const formData= {};
        for(let formElementIdentifier in this.state.orderform){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

        }
        const order= {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
            
        }
        //console.log(order)
        this.props.onOrderBurger(order,this.props.token)
       
        //console.log('yeah')
    }

    
    render() {
        const formElementsArray=[];
        for(let key in this.state.orderForm){
           // console.log(key);
            formElementsArray.push(
               { id: key,
                config: this.state.orderForm[key]
            }
            )
        }



        let form =(
            <form onSubmit= {this.orderHandler}> 
                    
                    {/* <Input elementType="input" elementConfig="text" value="name" placeholder="Your Name"/> */}
                    {formElementsArray.map(formElement=>{
                    //    console.log(formElement.config.elementConfig);
                       return <Input key={formElement.id} 
                                    touched = {formElement.config.touched}
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    changed={(event)=>this.inputChangedHandler(event, formElement.id) } />
                    } )}
                    <Button clicked = {this.orderHandler} disabled={!this.state.formIsValid} btnType='Success'>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    onOrderBurger : (orderData,token)=>dispatch(actions.purchaseBurger(orderData, token)),
    

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios))
