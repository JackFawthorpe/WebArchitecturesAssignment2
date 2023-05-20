// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";
import EditImageCol from "./EditImageCol";
import {authStore} from "../../store";

const EditProfileCard = (props: { setInEditMode: any }) => {

    const currentUser = authStore(state => state.currentUser);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <EditImageCol/>
                </div>
                <div className='col-8 ps-4'>
                    <h1>{currentUser?.firstName} {currentUser?.lastName}</h1>
                    <h3>{currentUser?.email}</h3>
                </div>
            </div>
            <div className='float-end'>
                <button className="btn btn-primary" onClick={() => {
                    props.setInEditMode(false)
                }}>View
                </button>
            </div>
        </div>
    )
}

export default EditProfileCard;