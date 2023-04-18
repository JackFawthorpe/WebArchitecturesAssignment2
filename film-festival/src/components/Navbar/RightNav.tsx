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
            {currentUser === null ? loggedOutAuthBar() : loggedInAuthBar()}
        </div>
    )
}
