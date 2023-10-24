import React from 'react'
import styles from './styles.module.css'
export const Reset = () => {
    return (
        <div className={styles.main}>
            <input type="email" placeholder='john@doe.com' className={styles.input}/>
            <button className={styles.btn}>Reset password</button>
        </div>
    )
}