import {authStore} from "../../store";
import {ChangeEvent, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";


interface FormDetails {
    email?: string,
    firstName?: string
    lastName?: string
    password?: string
    currentPassword?: string
}

const EditDetailsForm = (props: { setInEditMode: any }) => {

    const currentUser: any = authStore(state => state.currentUser);

    const [errorText, setErrorText] = useState<string>("");
    const [formDetails, setFormDetails] = useState<FormDetails>({})

    const handleSaveForm = async () => {
        await axios.patch(getBaseUrl() + `/users/${currentUser?.id}`, formDetails)
            .then(() => {
                authStore.getState().login({...currentUser, ...formDetails})
                props.setInEditMode(false);
            })
            .catch((err) => handleBadFormResponse(err.response));
    }

    const handleBadFormResponse = (response: any) => {
        if (response.status === 400) {
            switch (response.statusText) {
                case "Bad Request: data/currentPassword must NOT have fewer than 6 characters":
                case "Bad Request: data/password must NOT have fewer than 6 characters":
                    setErrorText("Your password cannot contain less than 6 characters");
                    break;
                case "Bad Request: data/email must match format \"email\"":
                    setErrorText("The email you have provided is invalid");
                    break;
                default:
                    setErrorText("You have provided invalid information");
                    break;
            }
        } else if (response.status === 401) {
            setErrorText("Incorrect current password provided");
        } else if (response.status === 403) {
            if (response.statusText === "Forbidden: Email already in use") {
                setErrorText("That email is already in use, please use another email")
            } else {
                setErrorText("Your new password cannot be the same as the old password")
            }
        } else {
            setErrorText("An error occurred please try again later");
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            const updatedForm: FormDetails = formDetails;
            // @ts-ignore
            delete updatedForm[event.target.name];
            setFormDetails(updatedForm);
        } else {
            setFormDetails({...formDetails, [event.target.name]: event.target.value})
        }
    }

    return (
        <>
            {errorText !== "" &&
                <div className='row pt-2'>
                    <div className="alert alert-danger text-center" role="alert">
                        {errorText}
                    </div>
                </div>
            }
            <div className="form-group pt-2">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder={currentUser?.email} name='email'
                       onInput={onInputChange}/>
            </div>
            <div className="form-group pt-2">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="form-control" id="firstName" placeholder={currentUser?.firstName}
                       name='firstName'
                       onInput={onInputChange}/>
            </div>
            <div className="form-group pt-2">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" className="form-control" id="lastName" placeholder={currentUser?.lastName}
                       name='lastName'
                       onInput={onInputChange}/>
            </div>
            <div className="form-group pt-2">
                <label htmlFor="currentPassword">Current Password:</label>
                <input type="password" className="form-control" id="currentPassword" onInput={onInputChange}
                       name='currentPassword'/>
                <div id="currentPasswordHelpBlock" className="form-text">
                    Only Required when you are changing your password
                </div>
            </div>
            <div className="form-group pt-2">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" onInput={onInputChange} name='password'/>
            </div>
            <div className="form-group pt-2">
                <button type="submit" className="btn btn-primary" onClick={handleSaveForm}>Save Changes</button>
                <button className="btn btn-primary ms-2" onClick={() => props.setInEditMode(false)}>Cancel</button>
            </div>
        </>
    )
}

export default EditDetailsForm