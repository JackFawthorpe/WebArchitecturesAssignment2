import {format} from 'date-fns';
import {useEffect, useState} from "react";
import axios from "axios";
import {getBaseUrl} from "../../config/BaseUrl";
import Genre from "../../types/Genre";

const FilmCard = (film: Film) => {

    const [loadedDirector, setLoadedDirector] = useState<boolean>(false);
    const [genre, setGenre] = useState<string | null>(null);
    const [director, setDirector] = useState<{ firstName: string, lastName: string }>({firstName: "", lastName: ""});

    useEffect(() => {
        let isSubscribed = true;

        const fetchDirectorInfo = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/users/" + film.directorId);
                if (isSubscribed) {
                    setDirector(response.data);
                    setLoadedDirector(true);
                }
            } catch {
                console.log("Oops");
            }
        }

        const fetchGenreName = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films/genres");
                if (isSubscribed) {
                    const genres: Genre[] = response.data;
                    setGenre(genres.find((genre: { genreId: number, name: string }) => genre.genreId === film.genreId)?.name ?? "Unknown");
                }
            } catch {
                console.log("Oops");
            }
        }

        fetchDirectorInfo();
        fetchGenreName();

        return () => {
            isSubscribed = false;
        }
    }, [])

    return (
        <>
            {loadedDirector && genre !== null &&
                <div className={'col-6 py-3'}>
                    <div className={'card'}>
                        <div className={'card-body'}>
                            <div className='row'>
                                <div className='col'>
                                    <img src={getBaseUrl() + "/films/" + film.filmId + "/image"} className="img-fluid"
                                         alt="Missing Film Image"/>
                                </div>
                                <div className='col'>
                                    <h5 className='card-title pb-1'>{film.title}</h5>
                                    <p className='card-text'>Age Rating: {film.ageRating}</p>
                                    <p className='card-text'>Release
                                        Date: {format(new Date(film.releaseDate), 'dd/MM/yyyy')}</p>
                                    <p className='card-text'>Genre: {genre}</p>
                                    <p className='card-text'>Rating: {film.rating}</p>
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='card-text'>Director: {director.firstName} {director.lastName}</p>
                                        </div>
                                        <div className='col'>
                                            <img src={getBaseUrl() + "/users/" + film.directorId + "/image"}
                                                 className="rounded float-end img-thumbnail director-image text-center"
                                                 alt="Missing Director's Picture"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FilmCard;