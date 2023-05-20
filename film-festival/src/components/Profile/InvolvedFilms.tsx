import {useEffect, useState} from "react";
import {authStore} from "../../store";
import axios from "axios";
import {getBaseUrl} from "../../config/BaseUrl";
import FilmCard from "../Films/FilmCard";

const InvolvedFilms = () => {

    const currentUser = authStore(state => state.currentUser);

    const [reviewed, setReviewed] = useState<Film[]>([]);
    const [directed, setDirected] = useState<Film[]>([]);

    useEffect(() => {
        let isSubscribed = true;

        const fetchReviewed = async () => {


            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {reviewerId: currentUser?.id}});
                if (isSubscribed) {
                    setReviewed(response.data.films);
                }
            } catch {
                console.log("Oops");
            }
        }

        const fetchDirected = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: {directorId: currentUser?.id}});
                if (isSubscribed) {
                    setDirected(response.data.films);
                }
            } catch {
                console.log("Oops");
            }
        }

        fetchReviewed();
        fetchDirected();

        return () => {
            isSubscribed = false;
        }

    }, [currentUser])

    return (
        <div className='row justify-content-center'>
            <div className='col-6 mt-3'>
                <div className='card p-3 mb-2'>
                    <h2 className='text-center'>Films I've Directed</h2>
                </div>
                {directed.map((film) => <FilmCard key={film.filmId} {...film}/>)}
            </div>
            <div className='col-6 mt-3'>
                <div className='card p-3 mb-2'>
                    <h2 className='text-center'>Films I've Reviewed</h2>
                </div>
                {reviewed.map((film) =>
                    <div className='pb-2'>
                        <FilmCard key={film.filmId} {...film}/>
                    </div>)}
            </div>
        </div>
    )
}

export default InvolvedFilms;