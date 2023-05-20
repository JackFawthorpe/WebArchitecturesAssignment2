import React, {createRef} from 'react';
import {RegisterModalBody} from "./RegisterModalBody";
import {LoginModalBody} from "./LoginModalBody";
import Modal from 'react-bootstrap/Modal';

type ModalProps = {
    show: any,
    closemodal: any
}

export const AuthModal = (props: ModalProps) => {

    const [mode, setMode] = React.useState<"Login" | "Register">("Login");

    const childRef = createRef<{ submitForm: (closeModal: any) => void, clearForm: () => void }>();

    const toggleBody = () => {
        setMode(mode === "Register" ? "Login" : "Register");
    }

    const submitForm = () => {
        if (childRef.current) {
            childRef.current.submitForm(props.closemodal);
        }
    }

    const handleClose = () => {
        if (childRef.current) {
            childRef.current.clearForm();
        }
        props.closemodal();
    }


    return (
        <Modal {...props} size="lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title">Not IMDB</h3>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-4 mx-3 border-end justify-content-center">
                                <span className="mb-5">
                                    {mode === "Register" ? "Already have an account?" : "Don't have an account?"}
                                </span>
                            <br/>
                            <button className="btn btn-sm btn-primary mt-3"
                                    onClick={toggleBody}>
                                {mode === "Register" ? "Login" : "Register"}
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
                    <button className="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    )
};