import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'
import {emailRegex} from '../../service/constants';
import {fb} from '../../service';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const auth = fb.auth;
    const provider = new GoogleAuthProvider();


    useEffect(() => {
        setValid(email && emailRegex.test(email) && password)
    }, [email, password])

    const registerHandler = () => {
        navigate('/register')
    }
    const resetHandler = () => {
        navigate('/reset')
    }
    const googleLoginHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const login = () => {
        if (valid) {
            setError('')
            fb.auth.signInWithEmailAndPassword(email, password)
                .then(res => {
                        if (!res.user) {
                            setError('Bad login. Try again')
                        } else {
                            console.log('Sign in success')
                        }
                    }
                )
            .catch(error => {
                if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
                    setError('Invalid credential')
                } else if (error.code === 'auth/user-not-found') {
                    setError('No account for this email')
                } else {
                    setError('Something went wrong :(')
                }
            })
        }
    }
    return (
        <div className={styles.main}>
            <h1>Sign In</h1>
            <input type="email"
                   value={email}
                   onChange={(e) => setEmail(e.currentTarget.value)}
                   placeholder="Email"/>
            <input type="password"
                   value={password}
                   onChange={(e) => setPassword(e.currentTarget.value)}
                   placeholder="Password"/>
            <div className={styles.signup}>
                <a href={''} onClick={registerHandler}>Register</a>
                <a href={''} onClick={resetHandler}>Reset Password</a>
            </div>
            <button onClick={login} disabled={!valid}>Sign In</button>
            <button onClick={googleLoginHandler} className={styles.google} id="signInGoogle">Sign In with Google
            </button>

            {error && <div className={`error-message ${styles.error}`}>{error}</div>}
        </div>

    )
}