import {AuthModal} from "./AuthModal";
import {authStore} from "../../store";

export const RightNav = () => {

    const currentUser = authStore(state => state.currentUser);

    const loggedOutAuthBar = () => {
        return (
            <>
                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#authModal">
                    Sign in
                </button>
                <AuthModal/>
            </>
        )
    }

    const loggedInAuthBar = () => {
        return (
            <>
                <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#authModal">
                    Sign out
                </button>
            </>
        )
    }

    return (
        <div className="me-2">
            <a className="btn btn-secondary me-2" href="/films">All films</a>
            {currentUser === null ? loggedOutAuthBar() : loggedInAuthBar()}
        </div>
    )
}
