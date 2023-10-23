import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import {MdAdd, MdClose} from 'react-icons/md';
import {v1} from 'uuid';
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {fb} from './../../service'
import {useAuth} from '../../hooks';

export const CreatePage = () => {

    const [namePage, setNamePage] = useState('')
    const [linkPage, setLinkPage] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const {id} = useParams()
    const [currentLink, setCurrentLink] = useState({value: '', name: '', id: ''})
    const navigate = useNavigate();
    const {authUser} = useAuth()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('/editPage')) {
            setIsEdit(true)
            fb.firestore.collection('linkPages').doc(id).get().then(res => {
                const data = res.data()
                if (data) {
                    setNamePage(data.name)
                    setLinkPage(data.links)
                } else {
                    console.error(404)
                }
            })
        } else {
            setIsEdit(false)
        }
    }, [id, location])

    const onChangePageNameHandler = (e) => setNamePage(e.target.value)
    const onChangeLinkNameHandler = (e) => {
        setCurrentLink({...currentLink, name: e.target.value})
    }
    const onChangeLinkURLHandler = (e) => {
        setCurrentLink({...currentLink, value: e.target.value.trim()})
    }
    const onDeleteLinkHandler = (l) => setLinkPage(linkPage.filter(pl => pl.id !== l.id))

    const onAddHandler = () => {
        setLinkPage([...linkPage, {name: currentLink.name, value: currentLink.value, id: v1()}])
        setCurrentLink({name: '', value: '', id: ''})
    }

    const createPageHandler = () => {
        if (authUser && namePage && linkPage.length) {
            fb.firestore.collection('linkPages').add({
                userId: authUser.uid,
                links: linkPage,
                name: namePage
            })
                .then(() => {
                    navigate(`/`);
                })
        }
    }

    const updatePageHandler = () => {
        if (id && authUser && namePage && linkPage.length) {
            fb.firestore.collection('linkPages').doc(id)
                .update({
                    links: linkPage,
                    name: namePage
                })
                .then(() => {
                    navigate(`/`);
                })
        }
    }

    return (
        typeof isEdit === 'boolean'
            ? <div className={styles.main}>
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
                        linkPage.map((l, i) => {
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

                <button disabled={!linkPage.length || !namePage}
                        className={styles.submit}
                        onClick={isEdit ? updatePageHandler : createPageHandler}>
                    {!isEdit ? 'Create' : 'Update'}
                </button>
            <button onClick={()=> navigate(`/`)} className={styles.cancel}>Cancel</button>


            </div>
            : <></>
    )
}