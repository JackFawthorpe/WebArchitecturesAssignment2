import React, {SetStateAction} from "react";
import FilmFiltersCard from "./FilmFiltersCard";
import FilmSortCard from "./FilmSortCard";
import FilmPaginationCard from "./FilmPagination";
import FilmSearchQuery from "../../types/FilmSearch";

type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
}
const FilmNav = (props: FilmNavProps) => {
    return (
        <nav className="bg-secondary vh-100 container">
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
        </nav>)
}

export default FilmNav