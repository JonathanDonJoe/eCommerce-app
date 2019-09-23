import React, { Component } from 'react';

class SignUp extends Component {

    state = {
        email: '',
        first: '',
        last: '',
        password: ''
    }

    changeEmail = (e) => {
        this.setState( {
            email: e.target.value
        })
    }
    changeFirst = (e) => {
        this.setState( {
            first: e.target.value
        })
    }
    changeLast = (e) => {
        this.setState( {
            last: e.target.value
        })
    }
    changePass = (e) => {
        this.setState( {
            pass: e.target.value
        })
    }


    render() {
        return (
            <div className="register-form">
                <input onChange={() => this.changeEmail} className="email-signup" placeholder="Email address" />
                <input onChange={() => this.changeFirst} className="first-signup" placeholder="First name" />
                <input onChange={() => this.changeLast} className="last-signup" placeholder="Last name" />
                <input onChange={() => this.changePass} className="password-signup" type='password' placeholder="Password" />
                <button className="sign-up-button">Sign up</button>
                <div className="border-rule"></div>
                <div className="login-text align-left">Already have an Airbnb account? <span onClick={() => {this.props.changeModalContent('login')}}>Log In</span></div>
            </div> 
        )
    }
}

export default SignUp;