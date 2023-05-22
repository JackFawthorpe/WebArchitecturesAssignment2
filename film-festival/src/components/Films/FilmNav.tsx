import React, {SetStateAction} from "react";
import FilmFiltersCard from "./FilmFiltersCard";
import FilmSortCard from "./FilmSortCard";
import FilmPaginationCard from "./FilmPaginationCard";
import FilmSearchQuery from "../../types/FilmSearch";
import FilmSearchCard from "./FilmSearchCard";

type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
    filmCount: number
}
const FilmNav = (props: FilmNavProps) => {

    return (
        <nav className="bg-secondary min-vh-100 container">
            <div className="row">
                <div className='col py-2'>
                    <FilmSearchCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
            </div>
            <div className="row">
                <div className='col py-2'>
                    <FilmFiltersCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
            </div>
            <div className="row">
                <div className='col-sm py-2'>
                    <FilmSortCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
                <div className='col py-2'>
                    <FilmPaginationCard changeFilmQuery={props.changeFilmQuery} filmCount={props.filmCount}/>
                </div>
            </div>
        </nav>)
}

export default FilmNav