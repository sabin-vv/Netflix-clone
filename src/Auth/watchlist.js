import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../db/Firebase"

export const addToWatchlist = async (uid, movie) => {
    await setDoc(doc(db, "users", uid, "watchlist", movie.id.toString()), movie)
}

export const removeFromWatchlist = async (uid, movieId) => {
    await deleteDoc(doc(db, "users", uid, "watchlist", movieId.toString()))
}

export const getWatchlist = async (uid) => {
    const snap = await getDocs(collection(db, "users", uid, "watchlist"))
    return snap.docs.map(doc => doc.data())
}