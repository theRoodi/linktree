import React from 'react';
import styles from '../DashboardLink/styles.module.css';
import {MdEdit, MdDelete, MdVisibility} from 'react-icons/md';

export const DashboardLink = ({page}) => {
    return (
        <div className={styles.page}>
            <div className={styles.title}>{page.name}</div>
                <div className={styles.btn}><MdVisibility/></div>
                <div className={styles.btn}><MdEdit/></div>
                <div className={styles.btn}><MdDelete/></div>
        </div>
    )
}