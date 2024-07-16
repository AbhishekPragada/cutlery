import React, { useEffect, useState } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { insertLoggedInUserThunk } from '../state/Thunk';
import { getUser } from '../state/Selector';
import '../assets/Login.scss';

export const Login = () => {
    const [isSignin, setIsSignin] = useState(true);
    const [loginDetails, setLoingDetails] = useState({
        email: '',
        password: ''
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    const userDetails = useSelector(getUser);

    const handleLoginDetailsChange = event => {
        const {name, value} = event.target;
        setLoingDetails(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(loginDetails.email, loginDetails.password, loginDetails.repassword)
    }
    const handleLogin = () => {
        dispatch(insertLoggedInUserThunk({email, password}));
    }
    const handleCreateAccount = () => {
        setIsSignin(false);
        setEmail('');
        setPassword('');
    }
    const handleSignIn = () => {
        setIsSignin(true);
    }

    useEffect(() => {
        if(!user && !loading){
            // set the user to undefined in the state
        }
    }, [user])
    return (
        <div className='loginModal'>
            <div className='login-cnt'>
                <div className='signin-cnt'>
                    <div className='signin-cnt-left'>
                        <div className='loginHeader'>
                            {isSignin ? 'Sign In' : 'Sign Up'}
                        </div>
                        <div className='or-login-text'>
                            {isSignin ? 'Or Login Using' : 'Or Sign Up Using'}
                        </div>
                        <div className='authSection'>
                            <Button
                                varinat="contained"
                                className="googleAuth"
                                startIcon={
                                <Avatar
                                    alt="Google"
                                    src={"https://img.icons8.com/?size=1x&id=17949&format=png"}
                                    style={{ height: "25px", width: "25px" }}
                                />
                                }>
                                Continue with Google
                            </Button>
                        </div>
                    </div>
                    <div className="signin-cnt-right">
                        <TextField
                            fullWidth
                            className="signin-fields email-cnt"
                            label="Email"
                            name="email"
                            margin="normal"
                            variant="outlined"
                            value={loginDetails.email}
                            onChange={handleLoginDetailsChange}
                        />
                        <TextField
                            fullWidth
                            className="signin-fields pwd-cnt"
                            label="Password"
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                            value={loginDetails.password}
                            onChange={handleLoginDetailsChange}
                        />
                        {isSignin ? <a className='forgot-pwd'>Forgot Password?</a> 
                        : <TextField
                            fullWidth
                            className="signin-fields pwd-cnt"
                            label="Password"
                            type="password"
                            margin="normal"
                            name="repassword"
                            variant="outlined"
                            value={loginDetails?.repassword}
                            onChange={handleLoginDetailsChange}
                            />
                        }
                    </div>
                    <div className="btn-cnt">
                        {isSignin ? <Button 
                            fullWidth
                            className="login-btn create-account-btn"
                            variant="contained"
                            color="secondary"
                            onClick={handleCreateAccount}
                        >
                            Create Account
                        </Button> : <Button 
                            fullWidth
                            className="login-btn create-account-btn"
                            variant="contained"
                            color="secondary"
                            onClick={handleSignIn}
                        >
                            Back
                        </Button>}
                        <Button
                            fullWidth
                            className="login-btn"
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                        >
                            {isSignin ? 'Login' : 'Sign Up'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}