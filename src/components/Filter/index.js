import React, { useEffect,useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './style.module.css'

import {
    paginateResults,
     setLoading ,
    orderByScore,
  orderByName,
} from '../../actions/index.js'

function Filter() {
        const {
        showedRecipes,
    } = useSelector(state => state)
    const dispatch = useDispatch()
   

    function applyFilters() {
        dispatch(setLoading())
        dispatch(paginateResults(showedRecipes))

    }
    useEffect(() => {
        if (showedRecipes.length) {
            applyFilters()
        }
    }, [showedRecipes])

  
      const orderNames = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
      
      };
      const orderScore = (e) => {
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
      
      };
  

    return (<>
    <div className={style.background}>
    <div className={style.component}>
        <div>
         <h2>{showedRecipes.length} matching results</h2>
        </div>
        <div className={style.filters}>
         <div> <h3>SORT BY:</h3></div>
         <div><select onChange={orderNames} className={style.option} >
            <option value="all">Name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select></div>
          <div><h3 className={style.or}> OR </h3></div>
          <div><select onChange={orderScore} className={style.option2} >
            <option value="all">Score</option>
            <option value="high">Highest Score</option>
            <option value="low">Lowest Score</option>
          </select></div>
          <div><button  className={style.btn}  onClick={applyFilters}>Apply</button></div>
        </div>
    </div>
    </div>
    </>
          
    )
}

export default Filter