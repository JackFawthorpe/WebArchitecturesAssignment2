
type FilmNavProps = {
    changeFilmQuery: ({}) => void
}

const FilmFiltersCard = (props: FilmNavProps) => {

    const isUserLoggedIn = true;

    return (
        <div className='card'>
            <div className='row p-2'>
                <h3>Filters</h3>
            </div>
            <div className='form-group'>
                <div className='container my-2'>
                    <div className='row'>
                        <div className='col-6'>
                            <label className='form-label h3' htmlFor='Genre'>
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
                            <label className='form-label  h3' htmlFor='Genre'>
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
                    {isUserLoggedIn &&
                        <div className={'row pt-3'}>
                            <div className={'col'}>
                                <label className={'form-label h3'}>
                                    Films I've interacted with
                                </label>
                                <div className={'row pt-2'}>
                                    <div className={'col'}>
                                        <input className="form-check-input" type="checkbox" id="MyFilmsCheckBox"/>
                                        <label className={'ps-2 form-label h5'} htmlFor={"MyFilmsCheckBox"}>My Films</label>
                                    </div>
                                    <div className={'col'}>
                                        <input className="form-check-input" type="checkbox" id="MyReviewsCheckBox"/>
                                        <label className={'ps-2 form-label h5'} htmlFor={"MyFilmsCheckBox"}>Films I've reviewed</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FilmFiltersCard