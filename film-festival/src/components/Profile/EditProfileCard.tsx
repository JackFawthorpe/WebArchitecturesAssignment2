// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";
import EditImageCol from "./EditImageCol";
import {authStore} from "../../store";
import EditDetailsForm from "./EditDetailsForm";

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
                    <EditDetailsForm setInEditMode={props.setInEditMode}/>
                </div>
            </div>
        </div>
    )
}

export default EditProfileCard;