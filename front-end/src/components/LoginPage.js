import React from 'react';
import Login from './NavBar/Login';
import './NavBar/NavBar.css';

function LoginPage(props) {

    const loginStyles = {
        'display':'block', 
        'border':'solid 1px black'
    }
    return (
        <div className='login-modal' style={loginStyles}>
            <Login closeModal={ () => {props.history.push('/host/homes')}} />
        </div>
    )
}
 
export default LoginPage;