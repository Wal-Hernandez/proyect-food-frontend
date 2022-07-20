import Filter from "../Filter";

import RecipeList from "../RecipeList";
import style from "./style.module.css"

import Pager from '../Pager';

import Diets from "../Diets";
import NavBar from "..//NavBar";
export default function Home() {

    return (
        <>
      
     
        <div className={style.component}>
        <div className={style.item1}>  
            <NavBar/>
            
            <Diets />
        </div>
        <div className={style.helper}></div>
        <div className={style.item2}>
            <div className={style.filter}>
            <Filter />
            </div>
            <div className={style.recipesList}>
            <RecipeList />
            <Pager/>
            </div>
           
        </div>
        </div>
       
        </>
    );
}
