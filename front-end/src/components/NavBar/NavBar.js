import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import ModalSplash from './ModalSplash';
import Login from './Login';
import SignUp from './SignUp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logoutAction from '../../actions/logoutAction';

class NavBar extends Component {

    state = {
        showModal: false,
        modalContent: <ModalSplash />
    }

    componentDidMount() {
        this.setState( {
            modalContent: <ModalSplash changeModalContent={this.changeModalContent} />
        })
    }

    changeModalContent = (newContent) => {
        let modalContent = <ModalSplash changeModalContent={this.changeModalContent} />
        if (newContent === 'login') {
            modalContent= <Login changeModalContent={this.changeModalContent} closeModal={this.closeModal} />
        } else if (newContent === 'signup') {
            modalContent= <SignUp changeModalContent={this.changeModalContent} closeModal={this.closeModal} />
        }
        this.setState( {
            modalContent
        })
    }

    signUp = (e) => {
        document.querySelector('body').classList = 'body-modal-show';
        this.setState({
            showModal: true
        })
        this.changeModalContent();
    }

    login = (e) => {
        document.querySelector('body').classList = 'body-modal-show';
        this.setState({
            showModal: true
        })
        this.changeModalContent('login');
    }
    
    closeModal = (e) => {
        document.querySelector('body').classList = '';
        this.setState({
            showModal: false
        })
    }

    buildNavLinks = () => {
        let navLinks = '';
        if(!this.props.auth.token) {
        navLinks = 
            <ul id='nav-mobile' className='right'>
            <li><Link to='/host/homes'>Host a Home</Link></li>
                <li><Link to='/host/experience'>Host an Experience</Link></li>
                <li><Link to='/help'>Help</Link></li>
                <li className='nav-non-link' onClick={this.signUp}>
                    Sign Up
                </li>
                <li className='nav-non-link' onClick={this.login}>
                    Log In
                </li>
            </ul>
        } else {
            navLinks = 
            <ul id='nav-mobile' className='right'>
            <li><Link to='/host/homes'>Host a Home</Link></li>
                <li><Link to='/saved'>Saved</Link></li>
                <li><Link to='/trips'>Trips</Link></li>
                <li onClick={this.props.logout}>Logout</li>
                <li><Link to='/account'>Welcome, {this.props.auth.first}</Link></li>
            </ul>
        }
        return navLinks;
    }

    render() { 

        const navLinks = this.buildNavLinks()
        return (     
            <div className='container-fluid nav'>
                <div className='row'>
                    <nav className='transparent'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>AirBnB</Link>
                            {navLinks}
                        </div>
                    </nav>
                </div>
                <div className="login-modal" style={this.state.showModal ? {"display": "block"} : {}} >
                    <button id="close-modal" onClick={this.closeModal}>&Chi;</button>
                    <div className="modal-content">
                        {this.state.modalContent}
                    </div>
                </div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    return ( {
        auth: state.auth
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: logoutAction
    }, dispatch)
}

// export default NavBar;
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);





