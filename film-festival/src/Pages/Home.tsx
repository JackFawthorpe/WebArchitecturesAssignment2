import "../components/Films/FilmNav"
import React, {useEffect, useState} from "react";
import FilmNav from "../components/Films/FilmNav";
import FilmSearchQuery from "../types/FilmSearch";
import axios from "axios";
import {getBaseUrl} from "../config/BaseUrl";
import FilmCard from "../components/Films/FilmCard";

const Home = () => {

    const [queryParams, setQueryParams] = useState<FilmSearchQuery>(
        {
            sortBy: "RELEASED_ASC",
            count: 8
        });

    const [filmList, setFilmList] = useState<Film[]>([]);

    useEffect(() => {
        let isGood = true;
        const fetchData = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: queryParams});
                if (isGood) {
                    setFilmList(response.data.films);
                }
            } catch {
                console.log("Oops");
            }
        }

        fetchData();
        return () => {
            isGood = false
        }
    }, [queryParams]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8 bg-success">
                        <div className={'row'}>
                            {filmList.map((film) => <FilmCard key={film.title} {...film}/>)}
                        </div>
                    </div>
                    <div className="col-4 p-0 bg-secondary">
                        <FilmNav changeFilmQuery={setQueryParams}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;