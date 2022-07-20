import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, NavLink } from "react-router-dom";
import style from './style.module.css'
import pred_img from '../../utils/game_default.png'
import {
    getRecipes,
    setLoading,
  searchRecipes,
  resetResponse,
} from '../../actions/index.js'
import Loading from '../Loading'
import Card from '../Card'
import ErrorGame from '../ErrorGame'





function RecipeList() {
    const {
        paginatedResults,
        loading,
        currentPage,
        showedRecipes,
        allRecipes,
    } = useSelector(state => state)


    const dispatch = useDispatch();
   
    const location = useLocation();

    function parseQuery(location) {
        let { search } = location
        if (!search) return {};
        let queryObj = new URLSearchParams(search);
        let queryObje = queryObj.get("name");
        return queryObje;
    }


  

    useEffect(() => {
     
      
        if (!allRecipes.length) {
            if (!loading) dispatch(setLoading());
            dispatch(getRecipes(''))
        }{
          dispatch(resetResponse())
        }
        
        let query = parseQuery(location);
        if(query.length)dispatch(searchRecipes(allRecipes,query)) 
    }, [location,allRecipes]);
   

    return  loading ? (<Loading />) :  (<>
        {parseQuery(location).search && (<h2 className={style.matchMsg}>Recipes matching "{parseQuery(location)}":</h2>)}
     
        <div className={style.component}>
            {showedRecipes.length
                ? paginatedResults[currentPage]?.map((result, i) => (
                    <Card key={result.id}
                        id={result.id}
                        name={result.name}
                        background_url={result.background_url || pred_img}
                        diets={result.diets}
                        healthScore={result.healthScore}
                        pos={i} />
                )) : < ErrorGame />}
        </div>
    
       
          
    </>)


}

export default RecipeList