import {ChangeEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import {patterns} from "../../config/RegexPatterns";
import axios from "axios";
import {authStore} from "../../store";
import {useNavigate} from "react-router-dom";

interface FormDetails {
    email: string,
    password: string
    firstName: string
    lastName: string
    profilePicFileName: string
}

export const RegisterModalBody = forwardRef((props, ref) => {

    const [showPassword, setShowPassword] = useState(false);
    const [submittingForm, setSubmittingForm] = useState(false);
    const [image, setImage] = useState(null);
    const [contentType, setContentType] = useState<string>("");
    const [showImageError, setShowImageError] = useState<boolean>(false);

    const [formDetails, setFormDetails] = useState<FormDetails>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        profilePicFileName: ""
    });

    useImperativeHandle(ref, () => ({
        submitForm,
        clearForm
    }));

    const submitForm = (closeModal: any) => {
        if (!hasEmptyRequiredFields && !hasInvalidFields) {
            if (!submittingForm) {
                setSubmittingForm(true);
                axios.post(getBaseUrl() + "/users/register", formDetails)
                    .then((response) => (handleSuccessfulRegister(response.data, closeModal)))
                    .catch((err) => {
                        if (err.response) {
                            handleBadRegisterRequest(err.response)
                        } else if (err.request) {
                            console.log(err.request);
                        } else {
                            console.log('Error', err.message);
                        }
                    })
                return;
            }
        }
        setShowEmptyFieldError(true);
    }

    const handleSuccessfulRegister = (data: { userId: number }, closeModal: any) => {
        axios.post(getBaseUrl() + "/users/login", formDetails)
            .then((response) => (handleSuccessfulLogin(response.data, closeModal)))
            .catch((err) => console.log(err))
    }

    const handleSuccessfulLogin = (data: { userId: number, token: string }, closeModal: any) => {
        authStore.getState().login({
            email: formDetails.email,
            firstName: formDetails.firstName,
            lastName: formDetails.lastName,
            id: data.userId,
            token: data.token
        });
        axios.defaults.headers.common['X-Authorization'] = data.token;
        if (!showImageError && contentType !== "") {
            axios.put(getBaseUrl() + `/users/${data.userId}/image`, image, {
                headers: {
                    "Content-Type": contentType
                }
            })
                .then((response) => (handleSuccessfulImageUpload(closeModal)))
                .catch(() => {
                    handleSuccessfulImageUpload(closeModal)
                })
        }
    }


    const navigate = useNavigate();

    const handleSuccessfulImageUpload = (closeModal: any) => {
        closeModal();
        navigate("/profile");
    }

    const clearForm = () => {
        setFormDetails({email: "", password: "", firstName: "", lastName: "", profilePicFileName: ""})
        setShowPassword(false);
    }


    const hasEmptyRequiredFields = useMemo<boolean>(() => {
        return formDetails.email === ""
            || formDetails.password === ""
            || formDetails.firstName === ""
            || formDetails.lastName === ""
    }, [formDetails]);

    const hasInvalidFields = useMemo<boolean>(() => {
        return !patterns.email.test(formDetails.email)
            || formDetails.password.length < 6
            || formDetails.firstName.length > 64
            || formDetails.lastName.length > 64
    }, [formDetails]);

    const [showEmptyFieldError, setShowEmptyFieldError] = useState(false);
    const showEmptyTimerReference = useRef<any>(-1);

    useEffect(() => {
        if (showEmptyFieldError) {
            showEmptyTimerReference.current = setTimeout(() => {
                setShowEmptyFieldError(false);
            }, 5000)

            return () => {
                clearTimeout(showEmptyTimerReference.current)
            }
        }
    }, [showEmptyFieldError])

    const showEmailTimerRef = useRef<any>(-1);
    const [showEmailInUseError, setShowEmailInUseError] = useState<boolean>(false);

    useEffect(() => {
        if (showEmailInUseError) {
            showEmailTimerRef.current = setTimeout(() => {
                setShowEmailInUseError(false);
            }, 5000)

            return () => {
                clearTimeout(showEmailTimerRef.current)
            }
        }
    }, [showEmailInUseError])

    const handleBadRegisterRequest = (err: any) => {
        if (err.status === 403) {
            setShowEmailInUseError(true);
        } else {
            console.log(JSON.stringify(err));
        }
        setSubmittingForm(false);
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const fileType = file.type;
        if (!["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
            setShowImageError(true);
            setImage(null);
        } else {
            setShowImageError(false);
            setImage(file);
        }
        setContentType(fileType);
    }

    return (
        <div className="container m-0 p-0">
            <form noValidate className="">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input className={`form-control 
                    ${(formDetails.firstName.length === 0 && showEmptyFieldError) || formDetails.firstName.length > 64 ? "is-invalid" : ""}`}
                           name="firstName"
                           value={formDetails.firstName} onChange={onInputChange}/>
                    <div className="invalid-feedback">
                        {(formDetails.firstName.length === 0 && showEmptyFieldError)
                            ? "First name cannot be empty"
                            : "First name cannot be longer than 64 characters long"}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input className={`form-control
                    ${(formDetails.lastName.length === 0 && showEmptyFieldError) || formDetails.lastName.length > 64 ? "is-invalid" : ""}`}
                           name="lastName"
                           value={formDetails.lastName} onChange={onInputChange}/>
                    <div className="invalid-feedback">
                        {(formDetails.lastName.length === 0 && showEmptyFieldError)
                            ? "Last name cannot be empty"
                            : "Last name cannot be longer than 64 characters"}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input className={`form-control 
                    ${(!patterns.email.test(formDetails.email) && formDetails.email.length !== 0) || (formDetails.email.length === 0 && showEmptyFieldError) || (showEmailInUseError) ? 'is-invalid' : ''}`}
                           name="email"
                           value={formDetails.email} onChange={onInputChange}/>
                    {!showEmailInUseError &&
                        <div className="invalid-feedback">
                            {patterns.email.test(formDetails.email)
                                ? "Please enter a valid email"
                                : "Email cannot be empty"}
                        </div>}
                    {showEmailInUseError &&
                        <div className="invalid-feedback">
                            Email is already in use
                        </div>
                    }
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group has-validation">
                        <input className={`form-control
                        ${(formDetails.password.length === 0 && showEmptyFieldError)
                        || (formDetails.password.length > 0 && formDetails.password.length < 6)
                            ? "is-invalid" : ""}`}
                               name="password"
                               value={formDetails.password} onChange={onInputChange}
                               type={showPassword ? "" : "password"}/>
                        <button type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}
                                className="btn btn-outline-primary">{showPassword ? "Hide " : "Show "} Password
                        </button>
                        <div className="invalid-feedback">Password must be atleast 6 characters long</div>
                    </div>


                </div>
                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input type="file" accept="image/png,image/jpeg,image/gif"
                           className={`form-control ${showImageError ? "is-invalid" : ""}`}
                           onChange={handleImageChange}/>
                    {showImageError && <div className="invalid-feedback">
                        Please select a valid image type (.png, .jpeg, .jpg, .gif)
                    </div>}
                </div>
                {image && <img alt="Selected profile picture"
                               className='img img-thumbnail'/>}
            </form>
        </div>
    )
})