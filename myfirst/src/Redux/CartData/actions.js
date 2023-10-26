import * as types from "./actionTypes"

export const addToCart = (payload) => {
    return {
        type:types.ADD_TO_CART,
        payload
    }
}

export const increaseCartQuantity = (payload) => {
    return {
        type:types.INCREASE_CART_QUANTITY,
        payload
    }
}
export const decreaseCartQuantity = (payload) => {
    return {
        type:types.DECREASE_CART_QUANTITY,
        payload
    }
}
export const deleteCartItem = (payload) => {
    return {
        type:types.DELETE_CART,
        payload
    }
}
