import * as types from "./actionTypes"
import axios from "axios"

const getShoesRequest = () => {
    return {
        type: types.GET_SHOES_REQUEST
    }
}
const getShoesSuccess = (payload) => {
    return {
        type: types.GET_SHOES_SUCCESS,
        payload
    }
}

const getShoesError = () => {
    return {
        type: types.GET_SHOES_ERROR
    }
}

const getShoes = (params) => (dispatch) => {
    console.log("params",params);
    dispatch(getShoesRequest())
    return axios
        .get(`https://shos-api.onrender.com/products`, params)
        .then((r) => {
            dispatch(getShoesSuccess(r.data))
        })
        .catch((e) => {
            dispatch(getShoesError())
        })

}

export { getShoes }
