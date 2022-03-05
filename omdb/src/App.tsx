import React, {ChangeEvent, useState} from 'react';
import './App.css';
import API from "./api/omdb-api";

function App() {
    const [searchName, setSearchName] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
            .then(res => {
                console.log(res)
            })
    }

    const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchName(e.currentTarget.value)
    }

    return (
        <div className="App">
            <h1>Movie Catalog</h1>
            <input type='text' value={searchName} onChange={onChangeSearchName}/>
            <button onClick={searchFilm}>Search</button>
            <div>
                {searchResult}
            </div>
        </div>
    );
}

export default App;
