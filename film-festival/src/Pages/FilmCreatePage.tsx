import {authStore} from "../store";
import CreateFilmCard from "../components/Film/CreateFilmCard";

const FilmCreatePage = () => {

    const currentUser = authStore(state => state.currentUser);

    const loggedIn = () => {
        return (
            <div className='container py-2 bg-secondary'>
                <CreateFilmCard/>
            </div>
        )
    }

    const loggedOut = () => {
        return (
            <div className='container py-2 bg-secondary'>
                <h3 className='card py-3 text-center'>
                    You are not currently logged in, Please register or Log in to create a film
                </h3>
            </div>
        )
    }

    return (
        <div className='container-fluid bg-secondary'>
            {currentUser != null ? loggedIn() : loggedOut()}
        </div>
    )
}

export default FilmCreatePage