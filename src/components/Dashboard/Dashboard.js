import React, {useEffect} from 'react';
import styles from './styles.module.css'
import {useAuth, usePages} from '../../hooks';

export const Dashboard = () => {

    const {authUser} = useAuth()
    const pages = usePages(authUser?.uid)

    useEffect(() => {
        console.log(pages)
    }, [pages])

    return (

        <div className={styles.main}>
            <h1>Pages</h1>
            { pages?.map((p, index) => {
                    return <div key={index} className={styles.page}>{p.name}</div>
                }) }
        </div>
    )
}




