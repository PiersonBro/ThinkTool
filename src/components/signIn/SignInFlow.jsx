/** @format */
import React, { useEffects, useState } from "react";
import firebase from "firebase"
import Modal from "./Modal";
import useModal from "./useModal";
//FIXME: Use proper buttoning styling CSS.
import buttonStyles from "../saveCustomNote/styles.css";

const SignInFlow = () => {
    const { isShowing, toggle } = useModal();
    return (
        <div className={buttonStyles.noteblock}>
            <button className="button-default" onClick={toggle}>Sign in</button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
        </div>
    );
};

export default SignInFlow;
