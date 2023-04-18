import {forwardRef, useImperativeHandle} from "react";

export const RegisterModalBody = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        submitForm
    }));

    const submitForm = () => {
        console.log("Submitting Register form");
    }

    return (
        <div>
            Blessed
        </div>
    )
})