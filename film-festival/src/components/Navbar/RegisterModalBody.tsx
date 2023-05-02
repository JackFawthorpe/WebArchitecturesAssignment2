import {ChangeEvent, forwardRef, useImperativeHandle, useState} from "react";


interface FormDetails {
    email: string,
    password: string
    firstName: string
    lastName: string
    profilePicFileName: string
}

export const RegisterModalBody = forwardRef((props, ref) => {

    const [showPassword, setShowPassword] = useState(false);


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

    const submitForm = () => {
        console.log("Submitting Register form");
    }

    const clearForm = () => {
        setFormDetails({email: "", password: "", firstName: "", lastName: "", profilePicFileName: ""})
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormDetails({...formDetails, [event.target.name]: event.target.value})
    }

    return (
        <div className="container m-0 p-0">
            <form noValidate className="">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input className={`form-control`}
                           name="firstName"
                           value={formDetails.firstName} onChange={onInputChange}/>
                    <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input className={`form-control`}
                           name="lastName"
                           value={formDetails.lastName} onChange={onInputChange}/>
                    <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input className={`form-control`}
                           name="email"
                           value={formDetails.email} onChange={onInputChange}/>
                    <div className="invalid-feedback"></div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input className={`form-control`}
                               name="password"
                               value={formDetails.password} onChange={onInputChange}
                               type={showPassword ? "" : "password"}/>
                        <button type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword)
                                }}
                                className="btn btn-outline-primary">{showPassword ? "Hide " : "Show "} Password
                        </button>
                    </div>
                    <div className="invalid-feedback"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input className="form-control" type="file" id="profilePicture" name="profilePicFileName"
                           value={formDetails.profilePicFileName} onChange={onInputChange}></input>
                </div>
            </form>
        </div>
    )
})