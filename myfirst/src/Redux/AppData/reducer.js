import * as types from "./actionTypes"

const intialState = {
    shoes: [],
    isLoading: false,
    isError: false
}

const reducer = (oldState = intialState, action) => {

    const { type, payload } = action;
    switch (type) {
        case types.GET_SHOES_REQUEST:
            return { ...oldState, isLoading: true };
        case types.GET_SHOES_SUCCESS:
            return { ...oldState, isLoading: false, shoes: payload };
        case types.GET_SHOES_ERROR:
            return { ...oldState, isLoading: false, isError: true }
        default:
            return oldState;
    }
}


export { reducer }