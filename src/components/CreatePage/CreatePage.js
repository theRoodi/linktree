import React, {useState} from 'react'
import styles from './styles.module.css'
import {MdClose,MdAdd} from 'react-icons/md';

export const CreatePage = () => {

    const [namePage, setNamePage] = useState('')
    const [pageLinks, setPageLinks] = useState([])
    const [currentLink, setCurrentLink] = useState('')

    const onChangeNameHandler = (e) => setNamePage(e.target.value)
    const onChangeLinkHandler = (e) => setCurrentLink(e.target.value)
    const onDeleteLinkHandler = (l) => setPageLinks(pageLinks.filter(pl => pl.id !== l.id))

    return (
        <div className={styles.main}>
            <input value={namePage}
                   onChange={onChangeNameHandler}
                   type="text" className={styles.name}/>

            <div className={styles.links}>
                <div>
                    <input type="text" value={currentLink} onChange={onChangeLinkHandler}/>
                    <div className={styles.add}><MdAdd/></div>
                </div>
                {
                    pageLinks.map((l, i) => {
                        return (
                            <div key={i} className={styles.link}>
                                <div className={styles.linkName}>{l.name}</div>
                                <div className={styles.linkValue}>{l.value}</div>
                                <div className={styles.deleteLink}
                                     onClick={() => onDeleteLinkHandler(l)}><MdClose/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <button className={styles.submit}>Create</button>


        </div>
    )
}