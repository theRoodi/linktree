import React, {useEffect, useState} from 'react';
import styles from './styles.module.css'
import {useParams} from 'react-router-dom';
import {useAuth, usePages} from '../../hooks';

export const Page = () => {
    const [page, setPage] = useState()
    const {id} = useParams()

    const {authUser} = useAuth()
    const pages = usePages(authUser?.uid)


    useEffect(() => {
        console.log(id)
        console.log(pages)
        if (id && pages) {
            setPage(pages.find(p => p.id === id))
        }
    }, [id, pages])
    return (
        <div className={styles.main}>
            <h1>{page?.name}</h1>
            {
                page?.links?.map((l, index) => {
                    return (
                        <div
                            className={styles.link}
                            key={index}
                            onClick={() => window.open(l.value)}>{l.name}</div>
                    )
                })
            }
        </div>
    )
}