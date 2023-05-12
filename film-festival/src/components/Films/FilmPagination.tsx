import React from "react";

const FilmPagination = () => {
    return (
        <div className='card'>
            <div className='row p-2'>
                <h3>Page</h3>
            </div>
            <div className='container my-2'>
                <div className='row'>
                    <div className='col'>
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmPagination