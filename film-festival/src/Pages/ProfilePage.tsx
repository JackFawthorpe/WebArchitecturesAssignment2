// @ts-ignore
import defaultImage from "../resources/defaultUser.png";
import {useState} from "react";
import ViewProfileCard from "../components/Profile/ViewProfileCard";
import EditProfileCard from "../components/Profile/EditProfileCard";
import {authStore} from "../store";
import InvolvedFilms from "../components/Profile/InvolvedFilms";

const ProfilePage = () => {

    const [inEditMode, setInEditMode] = useState<boolean>(false);

    const currentUser = authStore(state => state.currentUser);

    const loggedIn = () => {
        return (
            <div className='container py-2 bg-secondary'>
                <div className='card p-3'>
                    {inEditMode ? <EditProfileCard setInEditMode={setInEditMode}/> :
                        <ViewProfileCard setInEditMode={setInEditMode}/>}
                </div>
                <InvolvedFilms/>
            </div>
        )
    }

    const loggedOut = () => {
        return (
            <div className='container py-2 bg-secondary'>
                <h3 className='card py-3 text-center'>
                    You are not currently logged in, Please register or Log in to view your profile
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

export default ProfilePage