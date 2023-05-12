import React, {SetStateAction} from "react";
import FilmSearchQuery from "../../types/FilmSearch";

type FilmNavProps = {
    changeFilmQuery:(action: SetStateAction<FilmSearchQuery>) => void;
}
const FilmSortCard = (props: FilmNavProps) => {
    return (
        <div className='card h-100'>
            <div className='row p-2'>
                <h3>Order By</h3>
            </div>
            <div className='container my-2'>
                <div className='row p-0'>
                    <div className='col'>
                        <div className='dropdown'>
                            <button className="btn btn-primary dropdown-toggle me-2" type="button" id="GenreDropdown"
                                    data-toggle="dropdown">
                                Sort Fields
                            </button>
                            <button className="btn btn-primary">Direction</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmSortCard