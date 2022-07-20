import {
    GET_DIETS
} from "../types";
import axios from 'axios'


export default function getDiets() {
    return function (dispatch) {
        return axios.get('https://heroku-food-db.herokuapp.com/diets').then(res => {
            dispatch({
                type: GET_DIETS, payload: res.data || {}
            })
        },
            err => {
                dispatch({
                    type: GET_DIETS, payload: err.response.data || {}
                })
            })
    }
}