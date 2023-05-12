import React from "react";
import FilmFiltersCard from "./FilmFiltersCard";
import FilmSortCard from "./FilmSortCard";
import FilmPaginationCard from "./FilmPagination";

const FilmNav = () => {
    return (
        <div className="bg-secondary vh-100 container">
            <div className="row">
                <div className='col py-2'>
                    <FilmFiltersCard/>
                </div>
            </div>
            <div className="row">
                <div className='col-6 py-2'>
                    <FilmSortCard/>
                </div>
                <div className='col-6 py-2'>
                    <FilmPaginationCard/>
                </div>
            </div>
        </div>)
}

export default FilmNav