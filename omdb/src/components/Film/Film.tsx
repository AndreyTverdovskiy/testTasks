import React from "react";
import s from './Film.module.scss'

type FilmPropsType = {
    poster:string
    name:string,
    year:string,
    imdbID:string,
    type:string,
}

export const Film = React.memo(function (props: FilmPropsType) {
    return <div className={s.filmBlock}>
        <img src={props.poster} alt='film'/>
       <span>Name: {props.name}</span>
       <span>Year: {props.year}</span>
       <span>imdbID: {props.imdbID}</span>
       <span>Type: {props.type}</span>
    </div>
})