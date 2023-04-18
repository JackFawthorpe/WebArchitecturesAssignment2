import React from 'react';
import {RegisterModalBody} from "./RegisterModalBody";
import {LoginModalBody} from "./LoginModalBody";

export const AuthModal = () => {

    const [mode, setMode] = React.useState<"log in" | "register">("log in");

    const toggleBody = () => {
        setMode(mode === "register" ? "log in" : "register");
    }

    return (
        <div className="modal fade" id="authModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4 mx-3 border-end justify-content-center">
                                <span className="mb-5">
                                    {mode === "register" ? "Already have an account?" : "Don't have an account?"}
                                </span>

                                <button className="btn btn-sm btn-primary"
                                        onClick={toggleBody}>
                                    {mode === "register" ? "Login" : "Register"}
                                </button>
                            </div>
                            <div className="col">
                                {mode === "log in" ? <LoginModalBody/> : <RegisterModalBody/>}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};