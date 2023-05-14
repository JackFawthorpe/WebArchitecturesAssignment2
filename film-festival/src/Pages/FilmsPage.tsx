import "../components/Films/FilmNav"
import React, {useEffect, useState} from "react";
import FilmNav from "../components/Films/FilmNav";
import FilmSearchQuery from "../types/FilmSearch";
import axios from "axios";
import {getBaseUrl} from "../config/BaseUrl";
import FilmCard from "../components/Films/FilmCard";

const FilmsPage = () => {

    const [queryParams, setQueryParams] = useState<FilmSearchQuery>(
        {
            sortBy: "RELEASED_ASC",
            count: 8,
            startIndex: 0
        });

    const [filmList, setFilmList] = useState<Film[]>([]);
    const [filmCount, setFilmCount] = useState<number>(0);

    useEffect(() => {
        let isGood = true;
        const fetchData = async () => {
            try {
                const response = await axios.get(getBaseUrl() + "/films", {params: queryParams});
                if (isGood) {
                    setFilmList(response.data.films);
                    setFilmCount(response.data.count);
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
                    <div className="col-sm-4 p-0 bg-secondary">
                        <FilmNav changeFilmQuery={setQueryParams} filmCount={filmCount}/>
                    </div>
                    <div className="col-sm-8 bg-success">
                        <div className={'row'}>
                            {filmList.map((film) =>
                                <div className={'col-lg-6 py-3'}>
                                    <FilmCard key={film.title} {...film}/>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default FilmsPage;