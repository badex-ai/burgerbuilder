import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from 'react-redux'
import burgerBuilderReducer from './components/store/reducers/burgerBuilder'
import thunk from 'redux-thunk';
import orderReducer from './components/store/reducers/order';
import authReducer from './components/store/reducers/auth'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({
                      burgerBuilder: burgerBuilderReducer,
                      order:orderReducer,
                      auth: authReducer
                    }) 
const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk))) 
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
