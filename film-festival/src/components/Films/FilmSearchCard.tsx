import React, {SetStateAction, useState} from "react";
import FilmSearchQuery from "../../types/FilmSearch";


type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
}

const FilmSearchCard = ({changeFilmQuery}: FilmNavProps) => {
    const handleInputChange = (event: any) => {
        if (event.target.value != "") {
            changeFilmQuery((prev: FilmSearchQuery) => ({
                ...prev,
                q: event.target.value
            }))
        } else {
            changeFilmQuery((prev: FilmSearchQuery) => {
                const {q, ...rest} = prev;
                return rest
            })
        }
    }

    return (
        <div className='card container-fluid'>
            <div className='row p-2'>
                <h3>Search</h3>
            </div>
            <div className='p-2 d-flex'>
                <div className='flex-grow-1'>
                    <input className={`form-control`} onInput={handleInputChange} placeholder={"Enter a movie title or description"}/>
                </div>
            </div>
        </div>
    )
}

export default FilmSearchCard;

