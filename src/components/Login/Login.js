import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'
import {emailRegex} from '../../service/constants';
import {fb} from '../../service';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setValid(email && emailRegex.test(email) && password)
    }, [email, password])

    const login = () => {
        if (valid) {
            setError('')
            fb.auth.signInWithEmailAndPassword(email, password)
                .then(res => {
                        if (!res.user) {
                            setError('Bad login. Try again')
                        } else {
                            console.log("Sign in success")
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
            <input type="checkbox"/>

            <button onClick={login} disabled={!valid}>Sign In</button>

            {error && <div className={`error-message ${styles.error}`}>{error}</div>}
        </div>
    )
}