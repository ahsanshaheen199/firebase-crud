import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase-config';

function Login(  { setIsAuth } ) {
    let navigate = useNavigate();
    const signInWithGoogle = async ( ) => {
        try {
            await signInWithPopup(auth, provider);
            setIsAuth(true);
            navigate("/");
        } catch( error ) {
            console.log(error);
        }

    }

    return (
        <div className='loginPage'>
            <p> Sign in with google to continue </p>
            <button onClick={signInWithGoogle} className='login-with-google-btn'>Sign in with google</button>
        </div> 
    );
}

export default Login;
