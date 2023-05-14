import {useParams} from "react-router-dom";
import FilmDetails from "../components/Film/FilmDetails";

const FilmDetailsPage = () => {

    const {id} = useParams();

    return (
        <>
            <div className='container-fluid bg-secondary'>
                <div className='row vh-100'>
                    <div className='col-md-8 p-2 d-flex flex-column'>
                        <FilmDetails id={id !== undefined ? parseInt(id) : 0}/>
                        <div className='card mt-3'>
                            <h3 className='p-2'>Reviews</h3>
                        </div>
                    </div>
                    <div className='col-4'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FilmDetailsPage