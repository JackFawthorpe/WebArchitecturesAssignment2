import {AuthModal} from "./AuthModal";
import {authStore} from "../../store";
import {useState} from "react";
import axios from "axios";
import {getBaseUrl} from "../../config/BaseUrl";

export const RightNav = () => {

    const currentUser = authStore(state => state.currentUser);

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => {
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }

    const handleLogout = () => {
        const postLogout = async () => {
            const response = await axios.post(getBaseUrl() + "/users/logout");
            if (response.status === 200) {
                authStore.getState().logout();
            } else {
                console.log("Error logging out");
            }
        }

        postLogout();
    }

    const loggedOutAuthBar = () => {
        return (
            <>
                <button className="btn btn-secondary" onClick={handleShow}>
                    Sign in
                </button>
                <AuthModal show={showModal} closemodal={handleClose}/>
            </>
        )
    }

    const loggedInAuthBar = () => {
        return (
            <>
                <button className="btn btn-secondary" onClick={handleLogout}>
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
