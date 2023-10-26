import * as types from "./actionTypes";
const initialState = {
    isAuth: JSON.parse(localStorage.getItem("isLogin")) || "false",
    user: JSON.parse(localStorage.getItem("loginUser")) || null
}

const reducer = (oldstate = initialState, action) => {
    const { type, payload } = action
    switch (type) {
    
        case types.LOGIN_SUCCESS:
            localStorage.setItem("isLogin", JSON.stringify("true"))
            localStorage.setItem("loginUser", JSON.stringify(payload))
            return {
                ...oldstate, isAuth: JSON.parse(localStorage.getItem("isLogin")) ,  user: JSON.parse(localStorage.getItem("loginUser"))
            }
        case types.LOGOUT_USER:
            localStorage.setItem("isLogin", JSON.stringify("false"))
            localStorage.setItem("loginUser", JSON.stringify(null))
            return {
                ...oldstate, isAuth: JSON.parse(localStorage.getItem("isLogin")) ,  user: JSON.parse(localStorage.getItem("loginUser"))
            }
        default: return initialState
    }
}

export { reducer }