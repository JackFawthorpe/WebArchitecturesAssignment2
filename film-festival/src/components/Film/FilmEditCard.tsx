import {Dropdown, DropdownButton} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Genre from "../../types/Genre";
import axios, {AxiosResponse} from "axios";
import {getBaseUrl} from "../../config/BaseUrl";

interface FormDetails {
    title: string,
    description: string
    genreId: number
    releaseDate?: string
    ageRating?: string
    runtime?: number
}

type FilmEditProps = {
    film: FullFilm,
    setEditMode: any
}

const FilmEditCard = ({film, setEditMode}: FilmEditProps) => {

    const [errorText, setErrorText] = useState<string>("");
    const [showImageError, setShowImageError] = useState<boolean>(false);
    const [image, setImage] = useState(null);
    const [contentType, setContentType] = useState(null);
    const [formDetails, setFormDetails] = useState<FormDetails>(film);
    const ageRatings = ['G', 'PG', 'M', 'R13', 'R16', 'R18', 'TBC']
    const [genres, setGenres] = useState<Genre[]>([]);
    const [showImageSuccessText, setShowImageSuccessText] = useState<boolean>(false);
    const [genreTitle, setGenreTitle] = useState<string>("");
    const initTime = Date.now();

    useEffect(() => {
        const date = new Date(formDetails.releaseDate ?? "");
        const updatedForm = formDetails;
        updatedForm["releaseDate"] = date.getFullYear() + "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("0" + date.getDate()).slice(-2) + " " +
            ("0" + date.getHours()).slice(-2) + ":" +
            ("0" + date.getMinutes()).slice(-2) + ":" +
            ("0" + date.getSeconds()).slice(-2);
        delete updatedForm["runtime"];
        setFormDetails(updatedForm);
        fetchGenres();
    }, [])

    const fetchGenres = async () => {
        let isSubscribed = true;
        try {
            const response = await axios.get(getBaseUrl() + "/films/genres");
            if (isSubscribed) {
                setGenres(response.data);
            }
        } catch (e: any) {
            console.log(e.message);
        }
        return () => {
            isSubscribed = false
        }
    }

    useEffect(() => {
        setGenreTitle(genres.find((genre) => genre.genreId === film.genreId)?.name ?? "No genre selected")
    }, [genres])

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const fileType = file.type;
        if (!["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
            setShowImageError(true);
            setImage(null);
        } else {
            setShowImageError(false);
            setImage(file);
        }
        setContentType(fileType);
    }

    const onInputChange = (event: any) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }

    const onRuntimeChange = (event: any) => {
        if (event.target.value == "") {
            const updatedForm = formDetails;
            delete updatedForm["runtime"];
            setFormDetails(updatedForm);
        } else {
            setFormDetails({...formDetails, "runtime": parseInt(event.target.value)});
        }
    }

    const onDateChange = (event: any) => {
        if (event.target.value == "") {
            const updatedForm = formDetails;
            delete updatedForm["releaseDate"];
            setFormDetails(updatedForm);
        } else {
            const date = new Date(event.target.value);
            setFormDetails({
                ...formDetails, "releaseDate":
                    date.getFullYear() + "-" +
                    ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                    ("0" + date.getDate()).slice(-2) + " " +
                    ("0" + date.getHours()).slice(-2) + ":" +
                    ("0" + date.getMinutes()).slice(-2) + ":" +
                    ("0" + date.getSeconds()).slice(-2)
            });
        }
    }

    const handleSubmit = () => {
        axios.patch(getBaseUrl() + `/films/${film.filmId}`, formDetails)
            .then(() => {
                setEditMode(false)
            })
            .catch((err) => handleBadFormSubmission(err.response));
    }

    const handleBadFormSubmission = (response: AxiosResponse) => {
        switch (response.statusText) {
            case "Bad Request: data/description must NOT have fewer than 1 characters":
                setErrorText("Description cannot be empty");
                break;
            case "Bad Request: data/title must NOT have fewer than 1 characters":
                setErrorText("Title cannot be empty");
                break;
            case "Bad Request: data/releaseDate must match format \"datetime\"":
                setErrorText("You appear to be missing fields from release date")
                break;
            case "Cannot release a film in the past.":
                setErrorText("You cannot set the release date to the past");
                break;
            default:
                setErrorText("An error has occurred, please try again later");
        }
    }

    const handleImageUpload = () => {
        axios.put(getBaseUrl() + `/films/${film.filmId}/image`, image, {
            headers: {
                "Content-Type": contentType
            }
        })
            .then(() => setShowImageSuccessText(true))
            .catch((err) => handleBadImageSubmission(err.response));
    }

    const handleBadImageSubmission = (response: AxiosResponse) => {
        setErrorText(response.statusText);
    }

    return (
        <div className='card p-3'>
            <h1>Update {film.title}:</h1>

            <div className='container-fluid pt-2'>
                <div className='row'>

                    {errorText !== "" &&
                        <div className='row pt-2'>
                            <div className="alert alert-danger text-center" role="alert">
                                {errorText}
                            </div>
                        </div>
                    }
                    <div className='col-4'>
                        {showImageSuccessText &&
                            <div className='row pt-2'>
                                <div className="alert alert-warning text-center" role="alert">
                                    Successfully updated snapshot
                                </div>
                            </div>
                        }
                        {!image &&
                            <div className='row d-flex justify-content-center'>
                                <img src={getBaseUrl() + `/films/${film.filmId}/image?${initTime}`}
                                     className='img img-thumbnail'/>
                            </div>
                        }
                        {image &&
                            <div className='row d-flex justify-content-center'>
                                <img src={URL.createObjectURL(image)}
                                     className='img img-thumbnail'/>
                            </div>}
                        <div className="mb-3 pt-2 ps-1">
                            <label htmlFor="profilePicture" className="form-label">Film Snapshot</label>
                            <div className='row'>
                                <div className='col-9'>
                                    <input type="file" accept="image/png,image/jpeg,image/gif"
                                           className={`form-control ${showImageError ? "is-invalid" : ""}`}
                                           onChange={handleImageChange}/>
                                    {showImageError && <div className="invalid-feedback">
                                        Please select a valid image type (.png, .jpeg, .jpg, .gif)
                                    </div>}
                                </div>
                                <div className='col-2'>
                                    <button className='btn btn-primary' disabled={showImageError}
                                            onClick={handleImageUpload}>Upload
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className='col-8'>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className={`form-control`} name="title"
                                   placeholder="Enter movie title" value={formDetails.title}
                                   onInput={onInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea className={`form-control`} name="description"
                                      placeholder="Enter movie description" value={formDetails.description}
                                      onInput={onInputChange}/>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="releaseDate">Release Date:</label>
                                    <input type="datetime-local" pattern="\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"
                                           className={`form-control`}
                                           name="releaseDate" value={formDetails.releaseDate}
                                           onInput={onDateChange}/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="runtime">Runtime:</label>
                                    <input type="number" className={`form-control`}
                                           name="runtime" value={formDetails.runtime}
                                           placeholder="Enter movie runtime" onInput={onRuntimeChange}/>
                                </div>
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="genre">Genre:</label>
                                    {genreTitle !== "" &&
                                        <Dropdown>
                                            <DropdownButton
                                                title={formDetails.genreId != -1 ? genreTitle : "Select Genre"}>
                                                {genres.map((genre) => (
                                                    <Dropdown.Item key={'genre ' + genre} onClick={() => {
                                                        setGenreTitle(genre.name);
                                                        setFormDetails(prev => ({...prev, genreId: genre.genreId}));
                                                    }}>
                                                        {genre.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        </Dropdown>
                                    }
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Age Rating:</label>
                                    <Dropdown>
                                        <DropdownButton title={formDetails.ageRating ?? "Add an age rating"}>
                                            {ageRatings.map((rating) => (
                                                <Dropdown.Item key={'age rating ' + rating} onClick={() => {
                                                    setFormDetails(prev => ({...prev, ageRating: rating}));
                                                }}>
                                                    {rating}
                                                </Dropdown.Item>
                                            ))}
                                        </DropdownButton>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div className='row pt-1'>
                            <div className='col'>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmEditCard