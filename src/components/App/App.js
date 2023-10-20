import styles from './styles.module.css';
import React from 'react';
import {Login} from '../Login';
import {useAuth} from '../../hooks';
import {Dashboard} from '../Dashboard/Dashboard';
import {Page} from '../Page';
import {Route, Routes} from 'react-router-dom';
import {CreatePage} from '../CreatePage';


export const App = () => {

    const {isAuth, authUser} = useAuth()

    return (
        <div className={styles.main}>
            {authUser === undefined
                ? <></>
                : isAuth
                    ? <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/createPage" element={<CreatePage/>}/>
                        <Route path="/page/:id" element={<Page/>}/>
                    </Routes>
                    : <Login/>}
        </div>
    );
}
