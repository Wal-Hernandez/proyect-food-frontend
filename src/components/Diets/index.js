import React, { useState  } from 'react'
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {
  filterByType,
} from '../../actions/index.js'
import style from './style.module.css';
import down from '../../utils/down.png'

function Diets() {
    const {
        diets,
    } = useSelector(state => state)
  
  
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const filterTypes = (e) => {
   
        e.preventDefault();
        if(e.target.value === 'all'){
          navigate('/recipes');
          let option = document.getElementById("diets").options;
          for(let i = 0 ; i < option.length ; i++ ){
            console.log(i)
           option.item(i).removeAttribute("disabled")
          }
        }else{
          dispatch(filterByType(e.target.value));
          let option = document.getElementById(e.target.value);
          option.setAttribute("disabled","true");
        }

       
      };
  
  return (
    <div className={style.background}>
    <div className={style.component}>

   
     <select onChange={filterTypes} id="diets" className={style.select} >
            <option value="all" id="all"  className={style.option} >ALL DIETS </option>
            {diets?.map((d) => (
              <option key={d.name} value={d.name} id={d.name} className={style.option}> 
                {" "}
                {d.name[0].toUpperCase() + d.name.slice(1)}
              </option>
            ))}
         
          </select>
          
          </div>
           </div>
  )
}

export default Diets