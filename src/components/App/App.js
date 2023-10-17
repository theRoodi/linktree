import styles from './styles.module.css';
import React from 'react';
import {Login} from '../Login';
import {useAuth} from '../../hooks';
import {Dashboard} from '../Dashboard/Dashboard';
import {Page} from '../Page';
import {Route, Routes} from 'react-router-dom';


export const App = () => {

    const {isAuth} = useAuth()

    return (
        <div className={styles.main}>
            {isAuth
                ? <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/page/:id" element={<Page/>}/>
                </Routes>
                : <Login/>}
        </div>
    );
}
