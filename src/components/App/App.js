import styles from './styles.module.css';
import React from 'react';
import {Login} from '../Login/Login';
import {Signup} from '../Signup/Signup';


export const App = () => {
    return (
        <div className={styles.main}>
            <h1>Sign Up</h1>
            <Signup />
        </div>
    );
}
