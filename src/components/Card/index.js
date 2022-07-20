import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
export default function Card({
  id,
  name,
  background_url,
  diets,
  pos,
  healthScore,
}) {
  const navigate = useNavigate();
  const background_style = {
    backgroundImage: `url(${background_url})`,
    /* backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animationDelay: `${pos * 0.05}s` */
  };

  function hadle_game(e) {
    navigate(`/recipes/${id}`);
  }

  return (
    <>
      <div className={style.component}>
        <div onClick={hadle_game} className={style.item1}>
          <img src={background_url} alt="imagen" />
        </div>
        <div className={style.item2}>
          <div className={style.title}><h4 > Recipe</h4></div>
          <div className={style.title}><h3 > {name} </h3></div>
          <div className={style.info}>
            <p className={style.diets}>
              {diets.length <= 6
                ? diets?.map((diet) => diet).join(`, `)
                : diets
                    ?.filter((diet, i) => i < 6 && diet)
                    .map((diet) => diet)
                    .join(", ")
                    .concat(" and more...")}{" "}
            </p>
          </div>
          <div className={style.item24}><h1>{healthScore}% HEALTY SCORE </h1></div>
        </div>
      </div>
    </>
  );
}
