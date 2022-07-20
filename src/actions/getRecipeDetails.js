import axios from 'axios'
import { GET_RECIPE_DETAIL } from "../types"

export default function getGameDetail(id) {
    return function (dispatch) {
        return axios.get('https://heroku-food-db.herokuapp.com/recipes/' + (id || '')).then(
            res => {
               
                dispatch({
                    type: GET_RECIPE_DETAIL, payload: res.data || {}
                })
            },
            err => {
                dispatch({
                    type: GET_RECIPE_DETAIL, payload: err.response.data || {}
                })
            }
        )
    }
}