import React, {useEffect, useState} from 'react';
import s from './App.module.scss'
import API from "./api/omdb-api";
import {Film} from "./components/Film/Film";
import {Paginator} from "./components/Paginator/Paginator";
import Header from "./components/Header/Header";
import {useDebounce} from "./components/hooks/useDebounce";

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

    const [showPag, setShowPag] = useState(false)
    const [showRes, setShowRes] = useState(false)

    const searchFilm = async () => {
        try {
            const {data} = await API.searchFilmsByTitle(searchName, currentPage);
            const {Search, Error, Response, totalResults} = data;
            if (Response === 'True') {
                setSearchResult(Search)
                setTotalResults(totalResults)
                setShowPag(true)
                setShowRes(true)
                setError('')
            } else {
                setError(Error)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const debouncedSearchTerm = useDebounce(searchName, 200);

    useEffect(() => {
        searchFilm();
    }, [debouncedSearchTerm, currentPage])

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
    return (
        <div className={s.App}>
            <Header searchName={searchName}
                    setSearchName={setSearchName}
                    user={'Alexander Borisenko'}
            />
            {error === 'Movie not found!'
                ? error
                : <div>
                    {showRes && <h3>You search for: {searchName}, {totalResults} results found</h3>}
                    <div className={s.filmsBlock}>
                        <div className={s.filmsContainer}>
                            <div className={s.films}>
                                {listFilms}
                            </div>
                        </div>
                    </div>
                    {showPag && <Paginator totalResults={+totalResults}
                                           currentPage={currentPage}
                                           onChangedPage={changePage}
                    />}
                </div>
            }
        </div>
    );
}

export default App;
