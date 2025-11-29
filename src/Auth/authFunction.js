import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { auth, db } from "../db/Firebase";
import { doc, setDoc } from "firebase/firestore";

export const signUpUser = async (name, email, password) => {

    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        authProvider: "local",
        email
    })
    return user
}

export const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}
export const logOutUser = () => signOut(auth)

