/** @format */
import React, { useEffect, useState } from "react";
import firebase from "firebase"
import Modal from "./Modal";
import useModal from "./useModal";
import buttonStyles from "../Note/styles.css";

function SignInScreen({ callback }) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);
    
    // if not signed in, ask them to sign in
    if (!isSignedIn) {
        return (
            <div>
                <p>Please sign in!</p>
            </div>
        )
    }
    callback();
    return (
        <div>
            {/* display the user's name once they have logged in with Google */}
            <p>Welcome {firebase.auth().currentUser.displayName}!</p>
        </div>
    )
}
const SignInFlow = ({ callback }) => {
    const { isShowing, toggle } = useModal();
    return (
        <div className={buttonStyles.noteblock}>
            <SignInScreen callback={callback} />
            {/* Sign in button that brings up the modal to use sing in with Google */}
            <button className="button-default" onClick={toggle}>Sign in</button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
        </div>
    );
};

export default SignInFlow;
