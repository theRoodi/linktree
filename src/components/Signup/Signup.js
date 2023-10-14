import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'
import {emailRegex} from '../../service/constants';
import {fb} from '../../service';

export const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [valid, setValid] = useState(false)

    useEffect(() => {
        setValid(email && emailRegex.test(email) && password && verifyPassword && password === verifyPassword)
    }, [email, password, verifyPassword])

    const signUp = () => {
        if (valid) {
            fb.auth.createUserWithEmailAndPassword(email, password)
                .then(() => console.log('Signup success'))
        }
    }

    return (
        <div className={styles.main}>
            <input type="email"
                   value={email}
                   onChange={(e) => setEmail(e.currentTarget.value)}
                   placeholder="Email"/>
            <input type="password"
                   value={password}
                   onChange={(e) => setPassword(e.currentTarget.value)}
                   placeholder="Password"/>
            <input type="password"
                   value={verifyPassword}
                   onChange={(e) => setVerifyPassword(e.currentTarget.value)}
                   placeholder="Verify password"/>

            <button onClick={signUp} disabled={!valid}>Sign Up</button>
        </div>
    )
}