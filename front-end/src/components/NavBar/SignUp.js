import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signUpAction from '../../actions/signUpAction'

class SignUp extends Component {

    state = {
        email: '',
        first: '',
        last: '',
        pass: ''
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

    submitSignup = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="register-form">
                <form onSubmit={this.submitSignup}>
                    <input onChange={this.changeEmail} className="email-signup" placeholder="Email address" />
                    <input onChange={this.changeFirst} className="first-signup" placeholder="First name" />
                    <input onChange={this.changeLast} className="last-signup" placeholder="Last name" />
                    <input onChange={this.changePass} className="password-signup" type='password' placeholder="Password" />
                    <button className="sign-up-button waves-effect waves-light">Sign up</button>
                    <div className="border-rule"></div>
                    <div className="login-text align-left">Already have an Airbnb account? <span onClick={() => {this.props.changeModalContent('login')}}>Log In</span></div>
                </form>
            </div> 
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators( {
        signUpAction
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUp);