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
            <div className='loginHeaderSec'>
                <div className='loginHeader'>
                    <h1>{isSignin ? "Sign In" : "Sign Up"}</h1>
                </div>
                <div className='closeIcon'>
                    <CloseIcon/>
                </div>
            </div>
            <div>
                {isSignin ? SignIn(userDetails, email, password, handleEmailChange, handlePasswordChange, handleLogin) 
                    : SignUp()}
            </div>
            <div className='authSec'></div>
        </div>
    )
}

const SignIn = (userDetails, email, password, handleEmailChange, handlePasswordChange, handleLogin) => {
    return(
        <div className='sigin-cnt'>
            {userDetails?.email}
            <div className="signin-cnt-field">
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