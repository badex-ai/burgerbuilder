import * as actionTypes from './actionTypes'
import axios from 'axios'
import { updateObject } from '../../shared/utility'




export const authStart=()=>{
    return {
    type: actionTypes.AUTH_START
   } 
  
}

export const authSuccess =(token,userId )=>{
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    }
}

export const authFailed=(error)=>{
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expirationTime * 1000  )
    }
      
    
}

export const authLogout =(state, action)=>{
    return updateObject(state,{toke:null, userId: null})
}

export const  auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData=  {
            email:email,
            password:password,
            returnSecureToken: true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDK9shs3WRVXBs1_J_gf0b9aDALWQ-Mxn4'
         if(!isSignUp){
            
            url=' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDK9shs3WRVXBs1_J_gf0b9aDALWQ-Mxn4'
        }
        
        axios.post(url,authData)
        .then(response=> {
      //  console.log(response);
        let expirationDate =new Date( new Date().getTime() + response.data.expiresIn * 1000) ;
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', response.data.localId)

        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error=> {
      //  console.log(error)
        dispatch(authFailed(error))
    } ) 
    }
          
}

export const setAuthRedirectPath = (path)=>{
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState =()=>{
    return dispatch => {
       const token = localStorage.getItem('token');
       
        if(!token){
            dispatch(logout())
        } else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
           // console.log(expirationDate)
            
            if(expirationDate <= new Date()){
               dispatch(logout()) 
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
           
        }

      
    }
}