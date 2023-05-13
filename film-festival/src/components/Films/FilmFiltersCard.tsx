import Genre from "../../types/Genre";
import React, {SetStateAction, useEffect, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import {Dropdown, DropdownButton} from "react-bootstrap";
import FilmSearchQuery from "../../types/FilmSearch";

type FilmNavProps = {
    changeFilmQuery: (action: SetStateAction<FilmSearchQuery>) => void;
}

const FilmFiltersCard = (props: FilmNavProps) => {

    const isUserLoggedIn = true;

    const [nonSelectedGenres, setNonSelectedGenres] = useState<Genre[]>([{genreId: -1, name: "Loading Genres"}]);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);

    const [nonSelectedAgeRatings, setNonSelectedAgeRatings] = useState<string[]>(['G', 'PG', 'M', 'R13', 'R16', 'R18', 'TBC'])
    const [selectedAgeRatings, setSelectedAgeRatings] = useState<string[]>([]);

    useEffect(() => {
        fetchGenres();
    }, [])

    const fetchGenres = async () => {
        let isSubscribed = true;
        try {
            const response = await axios.get(getBaseUrl() + "/films/genres");
            if (isSubscribed) {
                setNonSelectedGenres(response.data);
            }
        } catch (e: any) {
            console.log(e.message);
        }
        return () => {
            isSubscribed = false
        }
    }

    const addGenre = (genre: Genre) => {
        setSelectedGenres(prev => [...prev, genre])
        setNonSelectedGenres(prev => prev.filter((listGenre) => (listGenre !== genre)))
        props.changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            genreIds: prev.genreIds !== undefined ? [...prev.genreIds, genre.genreId] : [genre.genreId]
        }))
    }
    const removeGenre = (genre: Genre) => {
        setNonSelectedGenres(prev => [...prev, genre])
        setSelectedGenres(prev => prev.filter((listGenre) => (listGenre !== genre)))
        props.changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            genreIds: prev.genreIds?.filter((listGenre) => (listGenre !== genre.genreId))
        }))
    }

    const addAgeRating = (rating: string) => {
        setSelectedAgeRatings(prev => [...prev, rating])
        setNonSelectedAgeRatings(prev => prev.filter((listRating) => (listRating !== rating)))
        props.changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            ageRatings: prev.ageRatings !== undefined ? [...prev.ageRatings, rating] : [rating]
        }))
    }
    const removeAgeRating = (rating: string) => {
        setNonSelectedAgeRatings(prev => [...prev, rating])
        setSelectedAgeRatings(prev => prev.filter((listRating) => (listRating !== rating)))
        props.changeFilmQuery((prev: FilmSearchQuery) => ({
            ...prev,
            ageRatings: prev.ageRatings?.filter((listRating) => (listRating !== rating))
        }))
    }

    return (
        <div className='card'>
            <div className='row p-2'>
                <h3>Filters</h3>
            </div>
            <div className='form-group'>
                <div className='container my-2'>
                    <div className='row'>
                        <div className='col-6'>
                            <label className='form-label h3' htmlFor='Genre'>
                                Genre
                            </label>
                            <Dropdown>
                                <DropdownButton title="Add a genre filter">
                                    {nonSelectedGenres.map((genre) => (
                                        <Dropdown.Item key={'genre ' + genre.genreId}
                                                       onClick={() => addGenre(genre)}>{genre.name}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Dropdown>
                        </div>
                        <div className='col-6'>
                            <label className='form-label  h3' htmlFor='Genre'>
                                Age Rating
                            </label>
                            <Dropdown>
                                <DropdownButton title="Add a Age Rating filter">
                                    {nonSelectedAgeRatings.map((rating) => (
                                        <Dropdown.Item key={'age rating ' + rating}
                                                       onClick={() => addAgeRating(rating)}>{rating}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Dropdown>
                        </div>
                    </div>
                    {isUserLoggedIn &&
                        <div className={'row pt-3'}>
                            <div className={'col'}>
                                <label className={'form-label h3'}>
                                    Films I've interacted with
                                </label>
                                <div className={'row pt-2'}>
                                    <div className={'col'}>
                                        <input className="form-check-input" type="checkbox" id="MyFilmsCheckBox"/>
                                        <label className={'ps-2 form-label h5'} htmlFor={"MyFilmsCheckBox"}>My
                                            Films</label>
                                    </div>
                                    <div className={'col'}>
                                        <input className="form-check-input" type="checkbox" id="MyReviewsCheckBox"/>
                                        <label className={'ps-2 form-label h5'} htmlFor={"MyFilmsCheckBox"}>Films I've
                                            reviewed</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                    {(selectedGenres.length !== 0 || selectedAgeRatings.length !== 0) &&
                        <div className={'row'}>
                            {selectedGenres.map(genre =>
                                <div className={'col py-1'}
                                     key={'genre ' + genre.genreId}>
                                    <span className={'badge badge-lg bg-primary text-black'}
                                          onClick={() => removeGenre(genre)}>{genre.name} X</span>
                                </div>
                            )}
                            {selectedAgeRatings.map(rating =>
                                <div className={'col py-1'}
                                     key={'age rating ' + rating}>
                                    <span className={'badge badge-lg bg-primary text-black'}
                                          onClick={() => removeAgeRating(rating)}>{rating} Rated X</span>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default FilmFiltersCard