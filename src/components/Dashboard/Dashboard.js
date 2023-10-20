import React, {useEffect} from 'react';
import styles from './styles.module.css'
import {useAuth, usePages} from '../../hooks';
import {DashboardLink} from '../DashboardLink';
import {useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    const navigate  = useNavigate ();

    const {authUser} = useAuth()
    const pages = usePages(authUser?.uid)

    const onCreateNewPage = () => {
        navigate(`/createPage`);
    }

    useEffect(() => {
        console.log(pages)
    }, [pages])

    return (

        <div className={styles.main}>
            <h1>Pages</h1>
            <div className={styles.createPageButton} onClick={onCreateNewPage}>Create New Page</div>
            { pages?.map((p, index) => {
                    return <DashboardLink page={p} key={index}/>
                }) }
        </div>
    )
}




