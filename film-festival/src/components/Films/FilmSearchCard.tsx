import React, {SetStateAction, useState} from "react";
import FilmSearchQuery from "../../types/FilmSearch";


type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
}

const FilmSearchCard = (props: FilmNavProps) => {

    const [input, setInput] = useState('');

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleInputChange = (event: any) => {
        setInput(event.target.value);
    }

    const handleSubmit = () => {
        if (input != "") {
            props.changeFilmQuery((prev: FilmSearchQuery) => ({
                ...prev,
                q: input
            }))
        }
    }

    return (
        <div className='card container-fluid'>
            <div className='row p-2'>
                <h3>Search</h3>
            </div>
            <div className='p-2 d-flex'>
                <div className='flex-grow-1'>
                    <input className={`form-control`} onInput={handleInputChange} onKeyDown={handleKeyPress}/>
                </div>
                <div className='ps-2'>
                    <button className={`btn btn-primary`} onClick={handleSubmit}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default FilmSearchCard;

