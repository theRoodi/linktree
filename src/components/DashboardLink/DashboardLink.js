import React from 'react';
import styles from '../DashboardLink/styles.module.css';
import {MdEdit, MdDelete, MdVisibility} from 'react-icons/md';
import {useNavigate } from 'react-router-dom'
import {fb} from './../../service'
export const DashboardLink = ({page}) => {

    const navigate  = useNavigate ();




    const handleClickView = () => {
        navigate(`/page/${page.id}`);
    }
    const handleClickEdit = () => {
        console.log(page)
    }
    const handleClickDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${page.name}?`)) {
            fb.firestore.collection('linkPages').doc(page.id).delete()
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>{page.name}</div>
                <div className={styles.btn} onClick={handleClickView}><MdVisibility/></div>
                <div className={styles.btn} onClick={handleClickEdit}><MdEdit/></div>
                <div className={styles.btn} onClick={handleClickDelete}><MdDelete/></div>
        </div>
    )
}