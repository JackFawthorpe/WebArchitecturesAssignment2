import React from "react";
import FilmDropDownsCard from "./FilmDropDownsCard";
import FilmSortCard from "./FilmSortCard";

const FilmNav = () => {
    return (
        <div className="bg-secondary vh-100 container">
            <div className="row">
                <div className='col py-2'>
                    <FilmDropDownsCard/>
                </div>
            </div>
            <div className="row">
                <div className='col py-2'>
                    <FilmSortCard/>
                </div>
            </div>
            <div className="row">
                <div className='col py-2'>
                    <div className='card'>
                        Test
                    </div>
                </div>
            </div>
        </div>)
}

export default FilmNav