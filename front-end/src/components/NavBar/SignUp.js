import React from 'react';


function SignUp(props) {
    return (
        <div className="register-form">
            <input className="email-signup" placeholder="Email address" />
            <input className="first-signup" placeholder="First name" />
            <input className="last-signup" placeholder="Last name" />
            <input className="password-signup" placeholder="Password" />
            <button className="sign-up-button">Sign up</button>
            <div className="border-rule"></div>
            <div onClick={() => {props.changeModalContent('login')}} className="login-text align-left">Already have an Airbnb account? <span onClick={() => {props.changeModalContent('login')}}>Log In</span></div>
        </div> 
    )
}

export default SignUp;