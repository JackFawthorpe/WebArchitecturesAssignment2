import {forwardRef, useImperativeHandle} from "react";

export const RegisterModalBody = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        submitForm,
        clearForm
    }));

    const submitForm = () => {
        console.log("Submitting Register form");
    }

    const clearForm = () => {
        // Pass
    }

    return (
        <div>
            Blessed
        </div>
    )
})