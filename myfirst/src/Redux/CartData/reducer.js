import * as types from "./actionTypes"
const initialState = {
    cart: [],
}

export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case types.ADD_TO_CART: {
            // console.log("payload =>", payload);
            // let's check in the cart if the same product is present 
            const isPresent = state.cart.find((prod) => {
                return prod.id === payload.id && prod.size === payload.size
            })

            let newCart
            // if present -> we'll increase the quantity
            if (isPresent) {
                newCart = state.cart.map((prod) => {
                    if (prod.id === payload.id && prod.size === payload.size) {
                        return { ...prod, qty: prod.qty + 1 }
                    } else {
                        return prod
                    }
                })
            } else {
                let newPayload = {
                    ...payload,
                    qty: 1
                }
                newCart = [...state.cart, newPayload]
            }

            return {
                ...state, cart: newCart
            }
        }
        case types.INCREASE_CART_QUANTITY: {
            // console.log("payload =>", payload);
            // let's check in the cart if the same product is present 
            // if present -> we'll increase the quantity
           
               let  newIncreasedCart = state.cart.map((prod) => {
                    if (prod.id === payload.id && prod.size === payload.size) {
                        return { ...prod, qty: prod.qty + 1 }
                    } else {
                        return prod
                    }
                })
            return {
                ...state, cart: newIncreasedCart
            }
        }
        case types.DECREASE_CART_QUANTITY: {
            console.log("payload =>", payload);
            // let's check in the cart if the same product is present             
            // if present -> we'll decrease the quantity
            let newDecreasedCart = state.cart.map((prod) => {
                    if (prod.id === payload.id && prod.size === payload.size) {
                        return { ...prod, qty: prod.qty - 1 }
                    } else {
                        return prod
                    }
                })
            return {
                ...state, cart: newDecreasedCart
            }
        }
        case types.DELETE_CART: {
            console.log("payload =>", payload);
    
            // if product is present then delete it.
            const updatedCart = state.cart.filter((prod) => {
                return !(prod.id === payload.id && prod.size === payload.size)
            })
            return {
                ...state, cart: updatedCart
            }
        }
        default: return state
    }

}