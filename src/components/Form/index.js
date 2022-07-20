import React, { useState, useEffect } from "react";

import { useNavigate /*, useLocation */ } from "react-router-dom";

import style from "./style.module.css";

import defImg from "../../utils/game_default.png";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, setLoading,getRecipes } from "../../actions/index.js";

import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import NavBar from "../NavBar";

function Form() {
  const [errorMsg, setErrorMsg] = useState("Please fill the required fields.");
  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 50,
    background_url: "",
    steps: "",
    diets: [],
  });
 
  const { loading, response, diets } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regexUrl =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  const regexNotEmpty = /(?!^$)/;

  function changeHandle(event) {
    let { name, value } = event.target;

    if (name === "diets") {
      if (value * 1 > 0 && !input[name].includes(value * 1)) {
        setInput((prevInput) => ({
          ...prevInput,
          [name]: [...prevInput[name], value * 1],
        }));
      }
    } else setInput({ ...input, [name]: value });
  }

  function submitHandle(event) {
    event.preventDefault();
    if (!errorMsg) {
      dispatch(setLoading());
      dispatch(postRecipe(input));
      dispatch(getRecipes(''));
      alert("Recipe created!");
      navigate("/recipes");
    } else {
      alert("You have required fields to complete!");
    }
  }

  function updateErrorMsg() {
    if (!input.name) {
      setErrorMsg("You need to specify a valid name.");
    } else if (!input.summary) {
      setErrorMsg("You need to specify a description");
    } else if (
      input.background_url ? !regexUrl.test(input.background_url) : false
    ) {
      setErrorMsg("If you want to provide an URL, make sure it's correct.");
    } else {
      setErrorMsg("");
    }
  }

  function deleteFromList(name, id) {
    setInput((prevInput) => ({
      ...prevInput,
      [name]: prevInput[name].filter((e) => e !== id),
    }));
  }

  useEffect(() => {
    updateErrorMsg();
  }, [input]);
  return (
    <>
      <div className={style.navFixed}>
        <NavBar />
      </div>
      <div className={style.background}>
        <div className={style.table}>
          <div className={style.component}>
            <form>
              <div className={style.flexItems}>
              <h1 className={style.submitTitle}>Prepare your recipe</h1>
                <div className={style.boxTitle}>
                  
                  <div>
                  <label>Name*</label><div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Type here the name"
                      onChange={changeHandle}
                      maxLength="256"
                    ></input>
                    </div>
                  </div>

                  <div>
                    <label>healthScore</label>
                    <div>0
                      <input
                      type="range"
                      name="healthScore"
                      onChange={changeHandle}
                      min="0"
                      max="100"
                    ></input>100</div>
                  </div>
                  <div>
                    <label>Diets:</label>
                    <div>
                      
                      <select name="diets" onChange={changeHandle} value="0">
                        <option value="0">Add a diet</option>
                        {diets?.map((diet) => (
                          <option key={diet.id} value={diet.id}>
                            {diet.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className={style.boxDesc}>
                  <div className={style.recipeImage}>
                    <label>Image URL:</label>
                    <input
                      type="text"
                      name="background_url"
                      placeholder="Image URL for your Recipe."
                      onChange={changeHandle}
                      maxLength="256"
                    ></input>
                    <div>
                    Image Preview:
                    <div>
                      <img
                        src={input.background_url || defImg}
                        width="300"
                        height="180"
                        alt="Preview Recipe Background"
                      />
                     </div>
                    </div>
                  </div>
                
                <div className={style.recipeText}>
                    <div>
                  <label>Description*</label>
                  <div>
                  <textarea
                    name="summary"
                    placeholder="Type here your Recipe description"
                    onChange={changeHandle}
                    maxLength="1024"
                    width="500px"
                  ></textarea>
                  </div>
                    </div>
                    <div>
                  <label>Steps*</label>
                  <div>
                  <textarea
                    name="steps"
                    placeholder="Type here your Recipe description"
                    onChange={changeHandle}
                    maxLength="1024"
                  ></textarea>
                  </div>
                  </div>
                </div>
                </div>
               </div>
               <div>
              </div>
              <button onClick={submitHandle}>
                <h2>Submit Recipe</h2>
              </button>
            </form>
           
          </div>
          <div className={style.selectedDiet}>
                  {input.diets?.map((diet) => (
                        <button
                          key={diet}
                          onClick={() => deleteFromList("diets", diet)}
                        >
                          {diets?.find((g) => g.id === diet).name} [x]
                        </button>
                      ))}
                  </div>
        </div>
      </div>
    </>
  );
}

export default Form;
