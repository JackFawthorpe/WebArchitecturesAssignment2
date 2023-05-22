import {useEffect, useState} from "react";
import FilmCard from "../Films/FilmCard";
import axios from "axios";
import {getBaseUrl} from "../../config/BaseUrl";
import {useParams} from "react-router-dom";

type SuggestedFilmsParams = {
    genreId: number;
    directorId: number;
}

const SuggestedFilms = ({genreId, directorId}: SuggestedFilmsParams) => {

    const [suggestedFilms, setSuggestedFilms] = useState<Film[]>([]);
    const {id} = useParams();

    const addFilms = (films: Film[]) => {
        setSuggestedFilms(prev => {
            const filteredFilms = films.filter((film: Film) => {
                // Check if the film's ID is already present in the prev array
                const isFilmAlreadyAdded = prev.some((prevFilm: Film) => prevFilm.title.toString() === film.title.toString());
                return !isFilmAlreadyAdded && (film.filmId.toString() !== id);
            });
            return [...prev, ...filteredFilms];
        });
    }

    useEffect(() => {
        setSuggestedFilms([]);
        let isSubscribed = true;
        const fetchDirectorMovies = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {directorId: directorId}});
                if (isSubscribed) {
                    addFilms(response.data.films);
                }
            } catch {
                console.log("Oops");
            }
        }

        const fetchGenreMovies = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {genreIds: [genreId]}});
                if (isSubscribed) {
                    if (isSubscribed) {
                        addFilms(response.data.films);
                    }
                }
            } catch {
                console.log("Oops");
            }
        }

        fetchDirectorMovies();
        fetchGenreMovies();
        return () => {
            isSubscribed = false
        }
    }, [id])

    return (
        <div className='container py-2'>
            <div className='card p-2'>
                <h3>Suggested Films</h3>
            </div>
            {suggestedFilms.length === 0 &&
                <div className={'card my-2 p-2'}>
                    <h5>No suggestions found</h5>
                </div>
            }
            {suggestedFilms.length !== 0 &&
                suggestedFilms.map((film: Film) =>
                        <div key={film.filmId} className='col py-2'>
                            <FilmCard {...film}/>
                        </div>
                    )}
        </div>
    )
}

export default SuggestedFilms;