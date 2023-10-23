import styles from './styles.module.css';
import React from 'react';
import {Login, Dashboard, Page, CreatePage, NotFound} from '../../components';
import {useAuth} from '../../hooks';
import {Route, Routes} from 'react-router-dom';

export const App = () => {

    const {isAuth, authUser} = useAuth()

    return (
        <div className={styles.main}>
            {authUser === undefined
                ? <></>
                : isAuth
                    ? <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/editPage/:id" element={<CreatePage/>}/>
                        <Route path="/createPage" element={<CreatePage/>}/>
                        <Route path="/page/:id" element={<Page/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    : <Login/>}
        </div>
    );
}
