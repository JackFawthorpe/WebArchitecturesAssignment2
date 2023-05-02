import {ChangeEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import {patterns} from "../../config/RegexPatterns";

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

    const clearForm = () => {
        setFormDetails({email: "", password: ""})
    }

    const submitForm = () => {
        if (formDetails.email !== "" && validEmail && formDetails.password !== "") {
            axios.post(getBaseUrl() + "/users/login", formDetails)
                .then((response) => (logUserIn(response.data)))
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


    const logUserIn = (userDetails: any) => {
        console.log(JSON.stringify(userDetails));
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
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input className={`form-control ${!validEmail || showEmptyError ? "is-invalid" : ""}`}
                           name="email"
                           value={formDetails.email} onChange={onInputChange}/>
                    <div
                        className="invalid-feedback">{formDetails.email.length === 0 ? "Please enter an email" : "Please enter a valid email"}</div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className={`form-control ${showEmptyError ? "is-invalid" : ""}`}
                           onChange={onInputChange} name="password"
                           value={formDetails.password}/>
                    <div className="invalid-feedback">Please enter a password</div>
                </div>
                <div className="row">
                    {showBadCredentialsError &&
                        <div className="alert alert-danger" role="alert">Invalid Username or Password</div>}
                    {showInternalServerError &&
                        <div className="alert alert-danger" role="alert">An error occured making your request, please
                            try again later</div>}
                </div>
            </div>
        </div>
    )
})