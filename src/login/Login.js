import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { insertLoggedInUserThunk } from '../state/Thunk';
import { getUser } from '../state/Selector';
import '../assets/Login.scss';

export const Login = () => {
    const [isSignin, setIsSignin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const userDetails = useSelector(getUser);

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handleLogin = () => {
        dispatch(insertLoggedInUserThunk({email, password}));
    }

    useEffect(() => {
        if(!user && !loading){
            // set the user to undefined in the state
        }
    }, [user])
    return (
        <div className='loginModal'>
            <div className='login-cnt'>
                {isSignin ? SignIn(userDetails, email, password, handleEmailChange, handlePasswordChange, handleLogin) 
                    : SignUp()}
            </div>
            {/* <div className='divider'></div>
            <div className='authSec'></div> */}
        </div>
    )
}

const SignIn = (userDetails, email, password, handleEmailChange, handlePasswordChange, handleLogin) => {
    return(
        <div className='signin-cnt'>
            <div className='signin-cnt-left'>
                <div className='loginHeader'>
                    Sign In
                </div>
                <div className='or-login-text'>
                    Or Login Using
                </div>
                <div className='authSection'>

                </div>
            </div>
            <div className="signin-cnt-right">
                <TextField
                    fullWidth
                    className="signin-fields email-cnt"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                />
                <TextField
                    fullWidth
                    className="signin-fields pwd-cnt"
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <a className='forgot-pwd'>Forgot Password?</a>
            </div>
            <div className="btn-cnt">
                <Button
                    fullWidth
                    className="login-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

const SignUp = () => {
    return(
        <div></div>
    )
}