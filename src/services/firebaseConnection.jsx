import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const apiKey = import.meta.env.VITE_apiKey
const authDomain = import.meta.env.VITE_authDomain
const projectId = import.meta.env.VITE_projectId
const storageBucket = import.meta.env.VITE_storageBucket
const messagingSenderId = import.meta.env.VITE_messagingSenderId
const appId = import.meta.env.VITE_appId

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage }