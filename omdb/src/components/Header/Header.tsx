import React from "react";
import s from './Header.module.scss'
import Search from "../Search/Search";

type headerPropsType = {
    searchName: string,
    setSearchName: (value: string) => void
    user:string
}

function Header(props: headerPropsType) {
    return (
        <div className={s.Header}>
            <h1>Movie Catalog</h1>
            <Search searchValue={props.searchName}
                    setSearchValue={props.setSearchName}
            />
            <div className={''}>
                <span>{props.user}</span>
            </div>
        </div>
    )
}

export default Header;