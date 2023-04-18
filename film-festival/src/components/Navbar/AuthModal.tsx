import React, {createRef} from 'react';
import {RegisterModalBody} from "./RegisterModalBody";
import {LoginModalBody} from "./LoginModalBody";

export const AuthModal = () => {

    const [mode, setMode] = React.useState<"Login" | "Register">("Login");

    const childRef = createRef<{ submitForm: () => void }>();

    const toggleBody = () => {
        setMode(mode === "Register" ? "Login" : "Register");
    }

    const submitForm = () => {
        if (childRef.current) {
            childRef.current.submitForm();
        }
    }

    return (
        <div className="modal modal-lg fade" id="authModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4 mx-3 border-end justify-content-center">
                                <span className="mb-5">
                                    {mode === "Register" ? "Already have an account?" : "Don't have an account?"}
                                </span>

                                <button className="btn btn-sm btn-primary"
                                        onClick={toggleBody}>
                                    {mode}
                                </button>
                            </div>
                            <div className="col">
                                {mode === "Login"
                                    ? <LoginModalBody ref={childRef}/>
                                    : <RegisterModalBody ref={childRef}/>}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={submitForm}>{mode}</button>
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};