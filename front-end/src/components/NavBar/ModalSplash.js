import React from 'react';

function ModalSplash(props) {


    return(
        <div>
            <button className="facebook-login">Connect With Facebook</button>
            <button className="google-login">Connect with Google</button>
            <span>or</span>
            <button onClick={() => {props.changeModalContent('signup')}} className="center email-login">Sign up with email</button>
            <div className="border-rule"></div>
            <div onClick={() => {props.changeModalContent('login')}} className="login-text align-left">Already have an Airbnb account? <span onClick={() => {props.changeModalContent('login')}}>Log In</span></div>
        </div>
    )
}

export default ModalSplash;