import React from "react";
import FilmFiltersCard from "./FilmFiltersCard";
import FilmSortCard from "./FilmSortCard";
import FilmPaginationCard from "./FilmPagination";

type FilmNavProps = {
    changeFilmQuery: ({}) => void
}
const FilmNav = (props: FilmNavProps) => {
    return (
        <div className="bg-secondary vh-100 container">
            <div className="row">
                <div className='col py-2'>
                    <FilmFiltersCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 py-2'>
                    <FilmSortCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
                <div className='col-6 py-2'>
                    <FilmPaginationCard changeFilmQuery={props.changeFilmQuery}/>
                </div>
            </div>
        </div>)
}

export default FilmNav