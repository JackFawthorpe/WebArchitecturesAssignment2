import {getBaseUrl} from "../../config/BaseUrl";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

type DirectorCardParams = {
    film: FullFilm,
    setEditMode: any
}

const DirectorFilmCard = ({film, setEditMode}: DirectorCardParams) => {

    const navigate = useNavigate();

    const handleDelete = () => {
        axios.delete(getBaseUrl() + `/films/${film.filmId}`)
            .then(() => {
                navigate("/films")
            })
            .catch((err) => {
                handleBadDelete(err.response)
            })
    }

    const handleBadDelete = (response: AxiosResponse) => {
        console.log(response.statusText);
    }

    return (
        <div className='container-fluid'>
            <div className='card mt-2 p-2'>
                <div className='row pt-1 '>
                    <div className='col'>
                        <h3>Director Settings</h3>
                    </div>
                </div>
                <div className='row py-1'>
                    <div className='col-1'>
                        <button
                            className={`btn btn-primary ${film.numReviews != 0 ? "disabled" : ""}`} onClick={() => {
                            setEditMode(true)
                        }}>Edit
                        </button>
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div className='row pt-1'>
                    <h5>Note: You will no longer be able to edit a film once a review has been placed</h5>
                </div>
            </div>
        </div>
    )
}

export default DirectorFilmCard;