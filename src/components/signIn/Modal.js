import React from 'react';
import ReactDom from "react-dom";
import SignIn from "./SignIn";
import firebase from "firebase";
import styles from "./popup_style.css";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google as the auth providers.
	signInOptions: [
	  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	]
};
// Based off of this tutorial!
// https://upmostly.com/tutorials/modal-components-react-custom-hooks
// A simple modal 'popup' ui that allows us to show our login providers, in this case only sign in with google. 
const Modal = ({ isShowing, hide }) => isShowing ? ReactDom.createPortal(
    <React.Fragment>
        <div className={styles.modalOverlay}/>
        <div className={styles.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className={styles.modal}>
                <button type={styles.buttonStyle} className={styles.modalCloseButton} data-dismiss="modal" aria-label="Close" onClick={hide}>
                    <span aria-hidden="true">&times;</span>
                </button>
			<SignIn uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        </div>
    </React.Fragment>, document.body
) : null;

export default Modal;
