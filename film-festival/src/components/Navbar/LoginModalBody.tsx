import {ChangeEvent, forwardRef, useImperativeHandle, useState} from "react";
import {getBaseUrl} from "../../config/BaseUrl";
import axios from "axios";
import {patterns} from "../../config/RegexPatterns";

interface FormDetails {
    email: string,
    password: string
}

export const LoginModalBody = forwardRef((props, ref) => {

    const [formDetails, setFromDetails] = useState<FormDetails>({email: "", password: ""});
    const [validEmail, setValidEmail] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
        submitForm
    }));

    const submitForm = () => {
        axios.post(getBaseUrl() + "/users/login", formDetails)
            .then((response) => (logUserIn(response.data)))
            .catch((err) => {
                console.log("error caught");
            })
    }

    const logUserIn = (userDetails: any) => {
        console.log(JSON.stringify(userDetails));
    }

    // User types
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFromDetails({...formDetails, [event.target.id]: event.target.value});
        if (!patterns.email.test(formDetails.email)) {
            setValidEmail(false);
        }
    };

    // User presses enter to submit form
    const handleKeyPress = (event: any) => {
        if (event.key === "Enter") {
            submitForm();
        }
    }

    return (
        <div>
            <div className="container">
                <form noValidate>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input className={`form-control ${validEmail ? "" : "is-invalid"}`} id="email"
                               aria-describedby="email" onKeyDown={handleKeyPress}
                               onChange={handleInputChange}/>
                        <div className="invalid-feedback">Please enter a valid email</div>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password"
                               className={`form-control ${formDetails.password.length !== 0 ? "" : "is-invalid"}`}
                               id="password" onKeyDown={handleKeyPress}
                               onChange={handleInputChange}/>
                        <div className="invalid-feedback">Please enter a password</div>
                    </div>
                </form>
            </div>
        </div>
    )
})