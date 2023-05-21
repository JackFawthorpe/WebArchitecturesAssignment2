import {getBaseUrl} from "../../config/BaseUrl";
import {format} from "date-fns";

// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";

type FilmDetailParams = {
    genre: string,
    film: FullFilm,
    director: { firstName: string, lastName: string }
}

const FilmDetails = ({genre, film, director}: FilmDetailParams) => {

    const replaceImage = (error: any) => {
        error.target.src = defaultImage;
    }


    return (
        <>
            {film !== null &&
                <div className='card p-3'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={getBaseUrl() + "/films/" + film.filmId + "/image?" + Date.now()}
                                 className="img-fluid"
                                 alt="Film Image"/>
                        </div>
                        <div className='col flex-grow-1 border-star'>
                            <div className='row border-bottom pb-3'>
                                <div className='col'>
                                    <h3>{film.title}</h3>
                                </div>
                                <div className='col'>
                                    <h3 className='float-end'>{film.numReviews !== 0 && "Rating: " + film.numReviews + "/10"}</h3>
                                </div>
                            </div>
                            <div className='row pt-3 border-bottom'>
                                <h5>Description:</h5>
                                <p>{film.description}</p>
                            </div>
                            <div className='row pt-3'>
                                <div className='row d-flex align-items-stretch pt-2'>
                                    <div className='col flex-column pb-3'>
                                        <h5>Release Date: {format(new Date(film.releaseDate), 'dd/MM/yyyy')}</h5>
                                        <h5>Age Rating: {film.ageRating}</h5>
                                    </div>
                                    <div className='col flex-column'>
                                        <h5>Runtime: {film.runtime} minutes</h5>
                                        {genre != null &&
                                            <h5>Genre: {genre}</h5>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='row pt-3 border-top'>
                                <div className='col'>
                                    <h5>Director: {director.firstName} {director.lastName}</h5>
                                </div>
                                <div className='col'>
                                    <img src={getBaseUrl() + "/users/" + film.directorId + "/image?" + Date.now()}
                                         className="rounded float-end img-thumbnail director-image text-center"
                                         alt="Missing Director's Picture"
                                         onError={replaceImage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FilmDetails