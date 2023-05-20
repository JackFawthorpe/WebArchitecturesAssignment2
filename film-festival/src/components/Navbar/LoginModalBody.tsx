import {ChangeEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import {patterns} from "../../config/RegexPatterns";
import {authStore} from "../../store";

interface FormDetails {
    email: string,
    password: string
}

export const LoginModalBody = forwardRef((props, ref) => {

    const [formDetails, setFormDetails] = useState<FormDetails>({email: "", password: ""});
    const validEmail = useMemo(() => {
        return patterns.email.test(formDetails.email) || formDetails.email.length === 0
    }, [formDetails]);
    useImperativeHandle(ref, () => ({
        submitForm,
        clearForm
    }));

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const clearForm = () => {
        setFormDetails({email: "", password: ""})
        setShowPassword(false);
    }

    const submitForm = (closeModal: any) => {
        if (formDetails.email !== "" && validEmail && formDetails.password !== "") {
            axios.post(getBaseUrl() + "/users/login", formDetails)
                .then((response) => (handleSuccessfulLogin(response.data, closeModal)))
                .catch((err) => {
                    if (err.response) {
                        handleBadRequest(err.response)
                    } else if (err.request) {
                        console.log(err.request);
                    } else {
                        console.log('Error', err.message);
                    }
                })
        } else {
            setShowEmptyError(true);
        }
    }


    const handleSuccessfulLogin = async (userDetails: any, closeModal: any) => {
        const storeUserData = async () => {
            const response = await axios.get(getBaseUrl() + `/users/${userDetails.userId}`);
            if (response.status === 200) {
                const user: User = response.data;
                authStore.getState().login({
                    ...user,
                    token: userDetails.token
                })
                axios.defaults.headers.common['X-Authorization'] = userDetails.token;
                closeModal();
            } else {
                return handleBadRequest(response);
            }
        }
        storeUserData();
    }

    const handleBadRequest = (err: any) => {
        switch (err.status) {
            case 401 || 400:
                setShowBadCredentials(true);
                return;
            case 500:
                setShowInternalServerError(true);
                return;
        }
    }

    const [showInternalServerError, setShowInternalServerError] = useState<boolean>(false);
    const internalServerErrorTimerReference = useRef<any>(-1);

    useEffect(() => {
        if (showInternalServerError) {
            internalServerErrorTimerReference.current = setTimeout(() => {
                setShowInternalServerError(false);
            }, 5000);

            return () => {
                clearTimeout(internalServerErrorTimerReference.current)
            }
        }
    }, [showInternalServerError])

    const [showBadCredentialsError, setShowBadCredentials] = useState<boolean>(false);
    const badCredentialsTimerReference = useRef<any>(-1);

    useEffect(() => {
        if (showBadCredentialsError) {
            badCredentialsTimerReference.current = setTimeout(() => {
                setShowBadCredentials(false);
            }, 5000);

            return () => {
                clearTimeout(badCredentialsTimerReference.current)
            }
        }
    }, [showBadCredentialsError])

    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);
    const EmptyFieldErrorTimeoutReference = useRef<any>(-1);

    useEffect(() => {
        if (showEmptyError) {
            EmptyFieldErrorTimeoutReference.current = setTimeout(() => {
                setShowEmptyError(false);
            }, 5000)

            return () => {
                clearTimeout(EmptyFieldErrorTimeoutReference.current)
            }
        }
    }, [showEmptyError])


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }


    return (
        <div>
            <div className="container">
                <form noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            className={`form-control ${!validEmail || (showEmptyError && formDetails.email.length === 0) ? "is-invalid" : ""}`}
                            name="email"
                            value={formDetails.email} onChange={onInputChange}/>
                        <div
                            className="invalid-feedback">{formDetails.email.length === 0 ? "Please enter an email" : "Please enter a valid email"}</div>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group has-validation">
                            <input
                                className={`form-control ${(showEmptyError && formDetails.password.length === 0) ? "is-invalid" : ""}`}
                                onChange={onInputChange} name="password"
                                value={formDetails.password}
                                type={showPassword ? "" : "password"}/>
                            <button type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                    className="btn btn-outline-primary">{showPassword ? "Hide " : "Show "} Password
                            </button>
                            <div className="invalid-feedback">Please enter a password</div>
                        </div>
                    </div>
                    <div className="row">
                        {showBadCredentialsError &&
                            <div className="alert alert-danger" role="alert">Invalid Username or Password</div>}
                        {showInternalServerError &&
                            <div className="alert alert-danger" role="alert">An error occured making your request,
                                please
                                try again later</div>}
                    </div>
                </form>
            </div>
        </div>
    )
})