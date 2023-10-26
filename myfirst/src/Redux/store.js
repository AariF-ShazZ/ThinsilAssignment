
import { legacy_createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk"
import { reducer as AppDataReducer } from "./AppData/reducer";
import { reducer as AuthDataReducer } from "./AuthData/reducer";
import { reducer as CartDataReducer } from "./CartData/reducer";
const rootReducer = combineReducers({ AppDataReducer, AuthDataReducer,CartDataReducer})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export { store }