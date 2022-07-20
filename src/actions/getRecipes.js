import axios from "axios";
import {
    GET_RECIPES
} from "../types";

export default function getRecipes(name) {
    return function (dispatch) {
        axios.get(`https://heroku-food-db.herokuapp.com/recipes${name ? `?name=${name}` : ''}`).then(res => {
            dispatch({
                type: GET_RECIPES, payload: res.data || {}
            })
        }, err => {
            dispatch({
                type: GET_RECIPES, payload: err.response.data || {}
            })
        });

    }
}