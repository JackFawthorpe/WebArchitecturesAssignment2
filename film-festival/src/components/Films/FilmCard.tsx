import {format} from 'date-fns';
import {useEffect, useState} from "react";
import axios from "axios";
import {getBaseUrl} from "../../config/BaseUrl";
import Genre from "../../types/Genre";

const FilmCard = (film: Film) => {

    const [loadedDirector, setLoadedDirector] = useState<boolean>(false);
    const [director, setDirector] = useState<{ firstName: string, lastName: string }>({firstName: "", lastName: ""});
    const [genre, setGenre] = useState<string | null>(null);

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
                <div className={'card'}>
                    <div className={'card-body'}>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={getBaseUrl() + "/films/" + film.filmId + "/image"}
                                     className="img-fluid pb-2"
                                     alt="Missing Film Image"/>
                            </div>
                            <div className='col'>
                                <a href={`/film/${film.filmId}`}>
                                    <h2 className='card-title pb-1'>{film.title}</h2>
                                </a>
                                <h4>Age Rating: {film.ageRating}</h4>
                                <h4 className='card-text'>Release
                                    Date: {format(new Date(film.releaseDate), 'dd/MM/yyyy')}</h4>
                                <h4 className='card-text'>Genre: {genre}</h4>
                                <h4 className='card-text'>Rating: {film.rating}</h4>
                                <div className='row pt-5'>
                                    <div className='col-xl-4'>
                                        <h4 className='card-text'>Director: {director.firstName} {director.lastName}</h4>
                                    </div>
                                    <div className='col-8'>
                                        <img src={getBaseUrl() + "/users/" + film.directorId + "/image"}
                                             className="rounded float-end img-thumbnail director-image text-center"
                                             alt="Missing Director's Picture"/>
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