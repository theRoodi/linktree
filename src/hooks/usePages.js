import React, {useEffect, useState} from 'react';
import {fb} from '../service'
export const usePages = (userId) => {
    const [pages, setPages] = useState()

    useEffect(() => {
        const unsubscribe = userId ? fb.firestore
            .collection('linkPages')
            .where('userId', '==', userId)
            .onSnapshot(snap => {
                const _pages = [];
                snap.forEach(s => {
                    _pages.push({
                        ...s.data(),
                        id: s.id,
                    });
                });
                setPages(_pages);
            })
            : undefined
        return unsubscribe
    },[userId])

    return pages
}