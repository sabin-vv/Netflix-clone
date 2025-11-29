/* eslint-disable react-refresh/only-export-components */
import { onAuthStateChanged, } from 'firebase/auth'
import { auth } from '../db/Firebase'
import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, logOutUser, signUpUser } from '../Auth/authFunction'
import { addToWatchlist, getWatchlist, removeFromWatchlist } from '../Auth/watchlist'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const list = await getWatchlist(currentUser.uid)
                setWatchlist(list)
            } else {
                setWatchlist([])
            }
            setLoading(false)
        })
        return unSubscribe
    }, [])

    const login = (email, password) => loginUser(email, password)
    const signUp = (name, email, password) => signUpUser(name, email, password)
    const logOut = () => logOutUser()
    const addWatchlist = async (movie) => {
        if (!user) return
        await addToWatchlist(user.uid, movie)
        setWatchlist(prev => [...prev, movie])
    }
    const removeWatchlist = async (movieId) => {
        if (!user) return
        await removeFromWatchlist(user.uid, movieId)
        setWatchlist(prev => prev.filter(item => item.id !== movieId))
    }

    return (
        <AuthContext.Provider value={{ user, login, signUp, logOut, watchlist, addWatchlist, removeWatchlist }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)