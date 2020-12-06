/** @format */
import React, { useEffect, useState } from "react";
import firebase from "firebase"
import Modal from "./Modal";
import useModal from "./useModal";
//FIXME: Use proper buttoning styling CSS.
import buttonStyles from "../saveCustomNote/styles.css";

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    if (!isSignedIn) {
        return (
            <div>
                <p>Please sign in!</p> 
            </div>
        )
    }

    return (
        <div>
         <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        </div>
    )
}
const SignInFlow = () => {
    const { isShowing, toggle } = useModal();
    return (
        <div className={buttonStyles.noteblock}>
            <SignInScreen/>
            <button className="button-default" onClick={toggle}>Sign in</button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
        </div>
    );
};

export default SignInFlow;