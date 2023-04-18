import React from 'react';

export const AuthModal = () => {
    return (
        <div className="modal" id="authModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <h5 className="modal-title">Login</h5>
                    <button className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};