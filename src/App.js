import style from './styles/App.module.css';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import NavBar from './components/NavBar';
import ErrorPage from './components/ErrorPage'
import RecipeDetail from './components/RecipeDetail';
import Form from './components/Form';
import { useDispatch, useSelector } from 'react-redux'
import { getDiets} from './actions/index.js'


function App() {

	const {diets} = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!diets.length) dispatch(getDiets())
}, []);
return (
  <div className={style.App}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/recipes" element={<><Home /></>} />
      <Route path="/recipes/:id" element={<><div className={style.navDetail}>
        <NavBar /></div>
        <RecipeDetail /> </>} />
      <Route path="/create" element={<Form />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  </div>
);
}

export default App;
