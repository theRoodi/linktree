import React, {useEffect, useState} from 'react';
import {fb} from '../service/firebase'


export const useAuth = () => {
    const [isAuth, setIsAuth] = useState()
    const [authUser, setAuthUser] = useState()

    useEffect(() => {
        const unsubscribe = fb.auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user)
                setIsAuth(true)
            } else {
                setAuthUser(null)
                setIsAuth(false)
            }
        })
        return unsubscribe
    }, [])

    return {
        isAuth, authUser
    }
}