import React from "react";

const FilmSortCard = () => {
    return (
        <div className='card'>
            <div className='container my-2'>
                <div className='row'>
                    <div className='col-2'>
                        <label htmlFor="sortByDropDown float-end">Sort:</label>
                    </div>
                    <div className='col-6'>
                        <div className='dropdown'>
                            <button className="btn btn-primary dropdown-toggle" type="button" id="GenreDropdown"
                                    data-toggle="dropdown">
                                Add a genre filter
                            </button>
                        </div>
                    </div>
                    <div className='col-2'>
                        <button className="btn btn-primary">Direction</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmSortCard