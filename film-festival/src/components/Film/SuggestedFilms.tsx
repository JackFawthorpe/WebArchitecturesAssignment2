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

    useEffect(() => {
        let isSubscribed = true;
        const fetchDirectorMovies = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {directorId: directorId}});
                if (isSubscribed) {
                    setSuggestedFilms(prev => {
                        const filteredFilms = response.data.films.filter((film: Film) => {
                            // Check if the film's ID is already present in the prev array
                            const isFilmAlreadyAdded = prev.some((prevFilm: Film) => prevFilm.title.toString() === film.title.toString());
                            return !isFilmAlreadyAdded && (film.filmId.toString() !== id);
                        });
                        return [...prev, ...filteredFilms];
                    });
                }
            } catch {
                console.log("Oops");
            }
        }

        const fetchGenreMovies = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {genreIds: [genreId]}});
                if (isSubscribed) {
                    setSuggestedFilms(prev => {
                        const filteredFilms = response.data.films.filter((film: Film) => {
                            // Check if the film's ID is already present in the prev array
                            const isFilmAlreadyAdded = prev.some((prevFilm: Film) => prevFilm.title.toString() === film.title.toString());
                            return !isFilmAlreadyAdded && (film.filmId.toString() !== id);
                        });
                        return [...prev, ...filteredFilms];
                    });
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
    }, [])

    return (
        <div className='container py-2'>
            <div className='card p-2'>
                <h3>Suggested Films</h3>
            </div>
            {suggestedFilms.map((film: Film) =>
                <div key={film.filmId} className='col py-2'>
                    <FilmCard {...film}/>
                </div>
            )}
        </div>
    )
}

export default SuggestedFilms;