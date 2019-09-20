import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    state = {
        showModal: false
    }

    signUp = (e) => {
        this.setState({
            showModal: true
        })
    }

    closeModal = (e) => {
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
                                <li className='nav-non-link' onClick={this.signUp}>
                                    {/* <Link to='/log-in'>Log In</Link> */}
                                    Log In
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className='login-modal' style={this.state.showModal ?  {'display': 'block'}: {}}>
                    <button className='close-modal' onClick={this.closeModal}>x</button>
                    <h1>Modal</h1>
                </div>
            </div>
        );
    }
}
 
export default NavBar;





