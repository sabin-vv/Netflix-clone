import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyALT9VLeCpQ7SLrSa0U-Us2aXYc_QXaQp4",
    authDomain: "netflix-clone-846d2.firebaseapp.com",
    projectId: "netflix-clone-846d2",
    storageBucket: "netflix-clone-846d2.firebasestorage.app",
    messagingSenderId: "257221888400",
    appId: "1:257221888400:web:85fb88dfbaa30a3458cb15"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app)