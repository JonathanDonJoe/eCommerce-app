import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../../actions/loginAction';


class Login extends Component {

    state = {
        email: '',
        pass: '',
        msg: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.auth.msg === 'wrongEmail') && (prevProps.auth.msg !== 'wrongEmail')) {
            this.setState( {
                msg: 'Wrong Email'
            })
        } else if ((this.props.auth.msg === 'wrongPass') && (prevProps.auth.msg !== 'wrongPass')) {
            this.setState( {
                msg: 'Wrong Pass'
            })
        } else if ((this.props.auth.msg === 'loggedIn') && (prevProps.auth.msg !== 'loggedIn')) {
            this.props.closeModal();
        }
    }

    changeEmail = (e) => {
        this.setState( {
            email: e.target.value
        })
    }
    changePass = (e) => {
        this.setState( {
            pass: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        //Add Validation for email/pass here
        const loginData = {...this.state}
        this.props.loginAction(loginData);
    }

    render() {
        console.log(this.props.auth)
        return (
            <div className="login-form">
            <p className='form-msg'>{this.state.msg}</p>
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect with Google</button>
                    <span>or</span>
                    <input onChange={this.changeEmail} type='email' className="email-signup" placeholder="Email address" required />
                    <input onChange={this.changePass} type='password' className="password-signup" placeholder="Password" required />
                    <button className="sign-up-button">Log In</button>
                    <div className="border-rule"></div>
                    <div className="login-text align-left">Don't have an account? <span onClick={() => {this.props.changeModalContent('signup')}}>Sign Up</span></div>
                </form>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return ( {
        auth: state.auth
    })
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators( {
        loginAction
    }, dispatch)
}

// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);