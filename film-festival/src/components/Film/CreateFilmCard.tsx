import React, {useEffect, useState} from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import {getBaseUrl} from "../../config/BaseUrl";
import Genre from "../../types/Genre";
import {useNavigate} from "react-router-dom";

interface FormDetails {
    title: string,
    description: string
    genreId: number
    releaseDate?: string
    ageRating?: string
    runtime?: number
}

const CreateFilmCard = () => {

    const navigate = useNavigate();
    const [{
        filmCreated,
        filmId
    }, setFilmCreated] = useState<{ filmCreated: boolean, filmId: number | null }>({filmCreated: false, filmId: null});
    const ageRatings = ['G', 'PG', 'M', 'R13', 'R16', 'R18', 'TBC']
    const [genres, setGenres] = useState<Genre[]>([]);
    const [errorText, setErrorText] = useState<string>("");
    const [formDetails, setFormDetails] = useState<FormDetails>({
        title: "",
        description: "",
        genreId: -1
    });

    useEffect(() => {
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

    const [genreTitle, setGenreTitle] = useState<string>("");

    const [image, setImage] = useState(null);
    const [showImageError, setShowImageError] = useState<boolean>(false);
    const [contentType, setContentType] = useState<string | null>(null);

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

    const handleSubmit = () => {
        if (image == null) {
            setErrorText("You must provide a snapshot for the movie");
            return;
        }
        if (!filmCreated) {
            axios.post(getBaseUrl() + "/films", formDetails)
                .then((response) => handleSuccessfulFormSubmission(response))
                .catch((err) => handleBadFormSubmission(err.response));
        } else {
            axios.put(getBaseUrl() + `/films/${filmId}/image`, image, {
                headers: {
                    "Content-Type": contentType
                }
            })
                .then(() => navigate(`/films/${filmId}`))
                .catch((err) => handleBadImageSubmission(err.response));
        }
    }

    const handleSuccessfulFormSubmission = (response: AxiosResponse) => {
        setFilmCreated({filmCreated: true, filmId: response.data.filmId});
        axios.put(getBaseUrl() + `/films/${response.data.filmId}/image`, image, {
            headers: {
                "Content-Type": contentType
            }
        })
            .then(() => navigate(`/film/${response.data.filmId}`))
            .catch((err) => handleBadImageSubmission(err.response));
    }

    const handleBadFormSubmission = (response: AxiosResponse) => {
        switch (response.statusText) {
            case "Bad Request: data/title must NOT have fewer than 1 characters":
                setErrorText("You must provide a title");
                break
            case "Bad Request: data/description must NOT have fewer than 1 characters":
                setErrorText("You must provide a description");
                break;
            case "Bad Request: data/genreId must be >= 0":
                setErrorText("You must select a genre");
                break;
            case "Bad Request: data/runtime must be number":
                setErrorText("Runtime must be a number");
                break;
            case "Cannot release a film in the past":
                setErrorText("The films release date cannot be in the past");
                break;
            default:
                setErrorText("An error occurred submitting your request please try again later");
        }
    }

    const handleBadImageSubmission = (response: AxiosResponse) => {
        setErrorText(response.statusText);
    }

    const onInputChange = (event: any) => {
        if (event.target.value === "") {
            const updatedForm: FormDetails = formDetails;
            // @ts-ignore
            delete updatedForm[event.target.name];
            setFormDetails(updatedForm);
        } else {
            setFormDetails({...formDetails, [event.target.name]: event.target.value})
        }
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

    return (
        <div className='card p-3'>
            <h1>Create a New Film:</h1>

            <div className='container-fluid'>
                <div className='row'>

                    {errorText !== "" &&
                        <div className='row pt-2'>
                            <div className="alert alert-danger text-center" role="alert">
                                {errorText}
                            </div>
                        </div>
                    }


                    <div className='col-4'>
                        <div className="mb-3">
                            <label htmlFor="profilePicture" className="form-label">Film Snapshot (Required)</label>
                            <input type="file" accept="image/png,image/jpeg,image/gif"
                                   className={`form-control ${showImageError ? "is-invalid" : ""}`}
                                   onChange={handleImageChange}/>
                            {showImageError && <div className="invalid-feedback">
                                Please select a valid image type (.png, .jpeg, .jpg, .gif)
                            </div>}
                        </div>
                        {image && <img src={URL.createObjectURL(image)} className='img img-thumbnail'/>}
                    </div>


                    <div className='col-8'>
                        <div className="form-group">
                            <label htmlFor="title">Title (Required):</label>
                            <input type="text" className={`form-control ${filmCreated ? "disabled" : ""}`} name="title"
                                   placeholder="Enter movie title"
                                   onInput={onInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description (Required):</label>
                            <textarea className={`form-control ${filmCreated ? "disabled" : ""}`} name="description"
                                      placeholder="Enter movie description" onInput={onInputChange}/>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="releaseDate">Release Date:</label>
                                    <input type="datetime-local" pattern="\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"
                                           className={`form-control ${filmCreated ? "disabled" : ""}`}
                                           name="releaseDate"
                                           onInput={onDateChange}/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="runtime">Runtime:</label>
                                    <input type="number" className={`form-control ${filmCreated ? "disabled" : ""}`}
                                           name="runtime"
                                           placeholder="Enter movie runtime" onInput={onRuntimeChange}/>
                                </div>
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="genre">Genre: (Required)</label>
                                    <Dropdown>
                                        <DropdownButton title={formDetails.genreId != -1 ? genreTitle : "Select Genre"}
                                                        disabled={filmCreated}>
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
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='form-group'>
                                    <label>Age Rating:</label>
                                    <Dropdown>
                                        <DropdownButton title={formDetails.ageRating ?? "Add an age rating"}
                                                        disabled={filmCreated}>
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
                    </div>
                    <div className='row pt-3'>
                        <div className='col'>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFilmCard