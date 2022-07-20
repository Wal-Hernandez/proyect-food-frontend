import React from 'react'
import style from './style.module.css'
function ErrorGame() {
    return (
        <div><p className={style.msg}>No recipes found :(</p> </div>
    )
}

export default ErrorGame