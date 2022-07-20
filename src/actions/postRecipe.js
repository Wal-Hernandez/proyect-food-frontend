import { POST_RECIPE } from "../types";
import axios from "axios";
export default function postGame(form) {
  return function (dispatch) {
    return axios.post("https://heroku-food-db.herokuapp.com/recipes", form).then(
      (res) => {
        
        dispatch({
          type: POST_RECIPE,
          payload: res.data || {},
        });
      },
      (err) => {
        dispatch({
          type: POST_RECIPE,
          payload: err.response.data || {},
        });
      }
    );
  };
}
