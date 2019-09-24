import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signUpAction from '../../actions/signUpAction'

class SignUp extends Component {

    state = {
        email: '',
        first: '',
        last: '',
        pass: '',
        msg: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.auth.msg === 'userExists') && (prevProps.auth.msg !== 'userExists')) {
            this.setState( {
                msg: 'This user already exists.  Please log in or create a new account'
            })
        } else if ((this.props.auth.msg === 'userAdded') && (prevProps.auth.msg !== 'userAdded')) {
            this.props.closeModal();
        }
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
        let formValid = true;
        let msg = '';
        // eslint-disable-next-line no-unused-vars
        for (let key in this.state) {
            console.log(key)
            if ((this.state[key].length<1) && (key !== 'msg')){
                formValid = false;
                msg = `${key} field is required`
                break
            }
        }

        if (this.state.pass.toLowerCase() === this.state.pass) {
            formValid = false;
            msg = 'Your password must contain at least 1 uppercase letter.'
        } else if (!(/\d/.test(this.state.pass))) {
            formValid = false;
            msg = 'Your password must contain at least 1 number.'
        }

        if (formValid) {
            const userData = {...this.state}
            this.props.signUpAction(userData);
            // this.setState( {
            //     msg: 'Successfully Signed Up'
            // })
        } else {
            this.setState( {
                msg
            })
        }
        
    }

    render() {
        // console.log(this.props.auth)
        return (
            <div className="register-form">
                <p className='form-msg'>{this.state.msg}</p>
                <form onSubmit={this.submitSignup}>
                    <input onChange={this.changeEmail} className="email-signup" placeholder="Email address" required type='email' />
                    <input onChange={this.changeFirst} className="first-signup" placeholder="First name" required />
                    <input onChange={this.changeLast} className="last-signup" placeholder="Last name" required />
                    <input onChange={this.changePass} className="password-signup" type='password' placeholder="Password" required />
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

function mapStateToProps(state) {
    return ( {
        auth: state.auth
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);