import React, {useState} from 'react'
import styles from './styles.module.css'
import {MdAdd, MdClose} from 'react-icons/md';
import {v1} from 'uuid';
import {useNavigate} from 'react-router-dom'
import {fb} from './../../service'
import {useAuth} from '../../hooks';

export const CreatePage = () => {

    const [namePage, setNamePage] = useState('')
    const [pageLinks, setPageLinks] = useState([])
    const [currentLink, setCurrentLink] = useState({value: '', name: '', id: ''})
    const navigate = useNavigate();

    const {authUser} = useAuth()

    const onChangePageNameHandler = (e) => setNamePage(e.target.value)
    const onChangeLinkNameHandler = (e) => {
        setCurrentLink({...currentLink, name: e.target.value})
    }
    const onChangeLinkURLHandler = (e) => {
        setCurrentLink({...currentLink, value: e.target.value.trim()})
    }
    const onDeleteLinkHandler = (l) => setPageLinks(pageLinks.filter(pl => pl.id !== l.id))

    const onAddHandler = () => {
        setPageLinks([...pageLinks, {name: currentLink.name, value: currentLink.value, id: v1()}])
        setCurrentLink({name: '', value: '', id: ''})
    }

    const createPageHandler = () => {
        if (authUser && namePage && pageLinks.length) {
            fb.firestore.collection('linkPages').add({
                userId: authUser.uid,
                links:pageLinks,
                name: namePage
            })
                .then(() => {
                    navigate(`/`);
                })
        }
    }

    return (
        <div className={styles.main}>
            <input value={namePage}
                   onChange={onChangePageNameHandler}
                   type="text" className={styles.name}
                   placeholder="Page name"/>

            <div className={styles.links}>
                <div className={styles.linkInputs}>
                    <input type="text"
                           value={currentLink.name}
                           onChange={onChangeLinkNameHandler}
                           placeholder="Link Name"/>
                    <input type="text"
                           value={currentLink.value}
                           onChange={onChangeLinkURLHandler}
                           placeholder="Link URL"
                    />
                    <button disabled={!currentLink.name || !currentLink.value}
                            className={styles.add}
                            onClick={onAddHandler}><MdAdd/>
                    </button>
                </div>
                {
                    pageLinks.map((l, i) => {
                        return (
                            <div key={i} className={styles.link}>
                                <div className={styles.linkName}>{l.name}</div>
                                <div className={styles.linkValue}>{l.value}</div>
                                <button className={styles.deleteLink}
                                        onClick={() => onDeleteLinkHandler(l)}><MdClose/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>

            <button disabled={!pageLinks.length || !namePage}
                    className={styles.submit}
                    onClick={createPageHandler}>Create
            </button>


        </div>
    )
}