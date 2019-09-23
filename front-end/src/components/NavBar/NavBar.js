import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import ModalSplash from './ModalSplash';
import Login from './Login';
import SignUp from './SignUp';

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
            modalContent= <Login changeModalContent={this.changeModalContent} />
        } else if (newContent === 'signup') {
            modalContent= <SignUp changeModalContent={this.changeModalContent} />
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

    render() { 
        return (     
            <div className='container-fluid nav'>
                <div className='row'>
                    <nav className='transparent'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left site-title'>AirBnB</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to='/host/homes'>Host a Home</Link></li>
                                <li><Link to='/host/experience'>Host an Experience</Link></li>
                                <li><Link to='/help'>Help</Link></li>
                                <li className='nav-non-link' onClick={this.signUp}>
                                    {/* <Link to='/sign-up'>Sign Up</Link> */}
                                    Sign Up
                                </li>
                                <li className='nav-non-link' onClick={this.login}>
                                    {/* <Link to='/log-in'>Log In</Link> */}
                                    Log In
                                </li>
                            </ul>
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
 
export default NavBar;





