const FilmDropDownsCard = () => {
    return (
        <div className='card'>
            <div className='form-group'>
                <div className='container my-2'>
                    <div className='row'>
                        <div className='col-6'>
                            <label className='form-label ' htmlFor='Genre'>
                                Genre
                            </label>
                            <div className='dropdown'>
                                <button className="btn btn-primary dropdown-toggle" type="button" id="GenreDropdown"
                                        data-toggle="dropdown">
                                    Add a genre filter
                                </button>
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className='form-label' htmlFor='Genre'>
                                Age Rating
                            </label>
                            <div className='dropdown'>
                                <button className="btn btn-primary dropdown-toggle" type="button" id="GenreDropdown"
                                        data-toggle="dropdown">
                                    Add a Age Rating filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmDropDownsCard