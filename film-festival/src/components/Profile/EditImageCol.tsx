// @ts-ignore
import defaultImage from "../../resources/defaultUser.png";
import {authStore} from "../../store";
import {useEffect, useRef, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";

const EditImageCol = () => {


    const currentUser = authStore(state => state.currentUser);
    const [profilePicURL, setProfilePicURL] = useState<string>(getBaseUrl() + "/users/" + currentUser?.id + "/image?" + Date.now());
    const [uploadImage, setUploadImage] = useState(null);
    const [contentType, setContentType] = useState<string>("");
    const [showImageTypeError, setShowImageTypeError] = useState<boolean>(false);
    const [showImageChangeError, setShowImageChangeError] = useState<boolean>(false);
    const imageChangeErrorTimerRef = useRef<any>(-1);

    const setImageToDefault = () => {
        setProfilePicURL(defaultImage);
    }

    const handleRemoveProfilePic = async () => {
        const response = await axios.delete(getBaseUrl() + `/users/${currentUser?.id}/image`);
        if (response.status === 200) {
            setImageToDefault();
        } else {
            setShowImageChangeError(true);
        }
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const fileType = file.type;
        if (!["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
            setShowImageTypeError(true);
        } else {
            setShowImageTypeError(false);
            setUploadImage(file);
            setContentType(fileType);
        }
    }

    const handleImageSave = async () => {
        const response = await axios.put(getBaseUrl() + `/users/${currentUser?.id}/image`, uploadImage, {
            headers: {
                "Content-Type": contentType
            }
        })
        if ((response.status === 200 || response.status === 201) && uploadImage !== null) {
            setProfilePicURL(URL.createObjectURL(uploadImage));
        } else {
            setShowImageChangeError(true);
        }
    }

    useEffect(() => {
        if (showImageChangeError) {
            imageChangeErrorTimerRef.current = setTimeout(() => {
                setShowImageChangeError(false);
            }, 5000)

            return () => {
                clearTimeout(imageChangeErrorTimerRef.current)
            }
        }
    }, [showImageChangeError])

    return (
        <>
            <div className='row'>
                <img src={profilePicURL}
                     className="rounded img-thumbnail"
                     alt="Your Picture"
                     onError={setImageToDefault}/>
            </div>
            <div className='row pt-2'>
                <div className='col-10'>
                    <input type="file" accept="image/png,image/jpeg,image/gif"
                           className={`form-control ${showImageTypeError ? "is-invalid" : ""}`}
                           onChange={handleImageChange}/>
                    {showImageTypeError && <div className="invalid-feedback">
                        Please select a valid image type (.png, .jpg, .gif)
                    </div>}
                </div>
                <div className='col-2'>
                    <div className='col d-flex justify-content-center'>
                        <button className={`btn btn-primary ${showImageTypeError ? 'disabled' : ''}`}
                                onClick={handleImageSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div className='row pt-2'>
                {profilePicURL !== defaultImage &&
                    <div className='col d-flex justify-content-start'>
                        <button className='btn btn-primary' onClick={handleRemoveProfilePic}>
                            Delete Picture
                        </button>
                        {showImageChangeError &&
                            <div className='row pt-2'>
                                <div className="alert alert-danger text-center" role="alert">
                                    An error occured updating your profile, please try again later
                                </div>
                            </div>}
                    </div>
                }
            </div>
        </>
    )
}

export default EditImageCol