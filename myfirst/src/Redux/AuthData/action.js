import axios from "axios";
import * as types from "./actionTypes";

 const registerUser = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});

const login = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
    
});
const logout = () => ({
    type: types.LOGOUT_USER
    
});


export { login,registerUser,logout }