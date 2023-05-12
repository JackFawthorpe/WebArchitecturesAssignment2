import React from "react";

const FilmSortCard = () => {
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