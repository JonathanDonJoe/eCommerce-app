import React from 'react';


function Login(props) {
    return (
        <div className="login-form">
            <button className="facebook-login">Connect With Facebook</button>
            <button className="google-login">Connect with Google</button>
            <span>or</span>
            <input className="email-signup" placeholder="Email address" />
            <input className="password-signup" placeholder="Password" />
            <button className="sign-up-button">Log In</button>
            <div className="border-rule"></div>
            <div className="login-text align-left">Don't have an account? <span onClick={() => {props.changeModalContent('signup')}}>Sign Up</span></div>
        </div>
    )
}

export default Login;