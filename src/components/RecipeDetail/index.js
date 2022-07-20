import React, { useEffect } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import pred_img from "../../utils/game_default.png";
import { getRecipeDetails, setLoading } from "../../actions/index.js";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";

function RecipeDetail() {
  const { id } = useParams();
  const { recipeDetail, loading } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== recipeDetail.id) {
      dispatch(setLoading());
      dispatch(getRecipeDetails(id));
    }
  }, [id, dispatch]);
  if (loading) return <Loading />;
  else if (recipeDetail.msg) return <ErrorPage />;
  else
    return (
      <>
      <div className={style.component}>
         
        <div className={style.item1}>
         <div className={style.titlebox}>
         <h1>{recipeDetail.name}</h1>
            <span className={style.p}>{recipeDetail.diet?.map((diet) => diet).join(", ")} </span>
           
            <div>
            Health Level:{" "}
            <progress
              id="healthScore"
              max="100"
              value={recipeDetail.healthScore}
              className={style.score}
            />{" "}
            {recipeDetail.healthScore}/100

            </div>
           
           
         </div>
         <div className={style.img}>
         <img src={recipeDetail.background_url || pred_img} alt="recipe" />
         </div>
          
            
        
        </div>
        <hr></hr>
        <div className={style.item2}>
          <div className={style.data}>
            <div
              dangerouslySetInnerHTML={{ __html: recipeDetail.summary }}
            ></div>
          </div>
        </div>

        <div className={style.item3}>
            Instructions
          <div dangerouslySetInnerHTML={{ __html: recipeDetail.steps }}></div>
        </div>
      </div>
      </>
    );
}

export default RecipeDetail;
