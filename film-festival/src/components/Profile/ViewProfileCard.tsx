import {getBaseUrl} from "../../config/BaseUrl";
import {authStore} from "../../store";

// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";

const ViewProfileCard = (props: { setInEditMode: any }) => {

    const currentUser = authStore.getState().currentUser;

    const replaceImage = (error: any) => {
        error.target.src = defaultImage;
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <img src={getBaseUrl() + "/users/" + currentUser?.id + "/image"}
                         className="rounded img-thumbnail"
                         alt="Your Picture"
                         onError={replaceImage}/>
                </div>
                <div className='col-8 ps-4'>
                    <h1>{currentUser?.firstName} {currentUser?.lastName}</h1>
                    <h3>{currentUser?.email}</h3>
                    <button className="btn btn-primary" onClick={() => {
                        props.setInEditMode(true)
                    }}>Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewProfileCard;