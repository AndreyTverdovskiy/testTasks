import React, {useEffect, useState} from 'react';
import s from './App.module.scss'
import API from "./api/omdb-api";
import {Film} from "./components/Film/Film";
import {Paginator} from "./components/Paginator/Paginator";
import Header from "./components/Header/Header";

type searchResultType = {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
    totalResults: string
}

function App() {
    const [searchResult, setSearchResult] = useState<Array<searchResultType>>([]);
    const [searchName, setSearchName] = useState('');
    const [error, setError] = useState('')

    const [totalResults, setTotalResults] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const searchFilm = async () => {
        try {
            const {data} = await API.searchFilmsByTitle(searchName, currentPage);
            const {Search, Error, Response, totalResults} = data;
            if (Response === 'True') {
                setSearchResult(Search)
                setTotalResults(totalResults)
                setError('')
            } else {
                setError(Error)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        searchFilm();
    }, [searchName, currentPage])

    const changePage = (currentPage: number) => {
        setCurrentPage(currentPage)
    }

    const listFilms = searchResult.map(lf => {
        return (
            <div>
                <Film poster={lf.Poster}
                      name={lf.Title}
                      year={lf.Year}
                      imdbID={lf.imdbID}
                      type={lf.Type}/>
            </div>
        )
    })

    if (error !== 'Movie not found!') {
        return (
            <div className={s.App}>
                <Header searchName={searchName}
                        setSearchName={setSearchName}
                />
                <div className={s.films}>
                    <span>You search for: {searchName}, {totalResults} results found</span>
                    {listFilms}
                </div>
                <Paginator totalResults={+totalResults}
                           onChangedPage={changePage}
                />
            </div>
        );
    } else {
        return (
            <div className={s.App}>
                <Header searchName={searchName}
                        setSearchName={setSearchName}
                />
                <>
                    {error}
                </>
            </div>
        )
    }
}

export default App;
