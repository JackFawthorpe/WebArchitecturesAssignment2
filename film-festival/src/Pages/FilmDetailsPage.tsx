import {useParams} from "react-router-dom";
import FilmDetails from "../components/Film/FilmDetails";
import {useEffect, useState} from "react";
import axios from "axios";
import {getBaseUrl} from "../config/BaseUrl";
import Genre from "../types/Genre";
import SuggestedFilms from "../components/Film/SuggestedFilms";
import ReviewsCard from "../components/Film/ReviewsCard";
import {authStore} from "../store";
import DirectorFilmCard from "../components/Film/DirectorFilmCard";


const FilmDetailsPage = () => {

    const {id} = useParams();
    const [genre, setGenre] = useState<string | null>(null);
    const [loadedDirector, setLoadedDirector] = useState<boolean>(false);
    const [director, setDirector] = useState<{ firstName: string, lastName: string }>({firstName: "", lastName: ""});
    const [film, setFilm] = useState<FullFilm | null>(null);
    const currentUser = authStore(state => state.currentUser);

    const fetchFilmData = async (isSubscribed: boolean) => {
        try {
            const response = await axios.get(getBaseUrl() + `/films/${id}`)
            if (isSubscribed) {
                setFilm(response.data);
            }
        } catch (e) {
            console.log("Error getting film data");
            console.log(e);
        }
    }

    useEffect(() => {

        let isSubscribed = true;
        fetchFilmData(isSubscribed)

        return () => {
            isSubscribed = false;
        }
    }, [id])

    useEffect(() => {

        let isSubscribed = true;

        const fetchGenre = async () => {
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

        if (film != null) {
            fetchGenre()
            fetchDirectorInfo()
        }


        return () => {
            isSubscribed = false;
        }
    }, [film])

    return (
        <>
            {film !== null && loadedDirector &&
                <div className='container-fluid bg-secondary'>
                    <div className='row'>
                        <div className='col-md-8 p-2 d-flex flex-column'>
                            <FilmDetails film={film} genre={genre !== null ? genre : "Unknown"} director={director}/>
                            <ReviewsCard film={film} updateFilm={fetchFilmData}/>
                        </div>
                        <div className='col-4 d-flex flex-column'>
                            {currentUser?.id == film.directorId &&
                                <DirectorFilmCard film={film}/>}
                            <SuggestedFilms genreId={film.genreId} directorId={film.directorId}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default FilmDetailsPage