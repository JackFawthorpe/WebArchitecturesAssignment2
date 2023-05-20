const DirectorFilmCard = () => {
    return (
        <div className='container-fluid'>
            <div className='card mt-2 p-2'>
                <div className='row pt-1'>
                    <div className='col-5'>
                        <h3>Director Settings</h3>
                    </div>
                    <div className='col'>
                    </div>
                    <div className='col'>
                        <button className='btn btn-primary float-end me-2'>Edit</button>
                        <button className='btn btn-primary float-end me-2'>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirectorFilmCard;