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

    const submitForm = () => {
        if (formDetails.email !== "" && formDetails.password !== "") {
            axios.post(getBaseUrl() + "/users/login", formDetails)
                .then((response) => (logUserIn(response.data)))
                .catch((err) => {
                    console.log("error caught");
                })
        } else {
            setShowEmptyError(true);
        }
    }

    const clearForm = () => {
        setFormDetails({email: "", password: ""})
    }

    const [showEmptyError, setShowEmptyError] = useState<boolean>(false);
    const errorTimeoutReference = useRef<any>(-1);

    useEffect(() => {
        if (showEmptyError) {
            clearTimeout(errorTimeoutReference.current);
            errorTimeoutReference.current = setTimeout(() => {
                setShowEmptyError(false);
            }, 5000)

            return () => {
                clearTimeout(errorTimeoutReference.current)
            }
        }
    }, [showEmptyError])


    const logUserIn = (userDetails: any) => {
        console.log(JSON.stringify(userDetails));
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }


    return (
        <div>
            <div className="container">
                <form noValidate>
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
                </form>
            </div>
        </div>
    )
})