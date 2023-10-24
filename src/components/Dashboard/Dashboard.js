import React, {useEffect} from 'react';
import styles from './styles.module.css'
import {useAuth, usePages} from '../../hooks';
import {DashboardLink} from '../DashboardLink';
import {useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";

export const Dashboard = () => {
    const navigate  = useNavigate ();

    const {authUser} = useAuth()
    const pages = usePages(authUser?.uid)

    const onCreateNewPage = () => {
        navigate(`/createPage`);
    }
    const logoutHandler = () => {
        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
    }

    return (

        <div className={styles.main}>
            <button onClick={logoutHandler}>Logout</button>
            <h1>Pages</h1>
            <div className={styles.createPageButton} onClick={onCreateNewPage}>Create New Page</div>
            { pages?.map((p, index) => {
                    return <DashboardLink page={p} key={index}/>
                }) }

        </div>
    )
}




