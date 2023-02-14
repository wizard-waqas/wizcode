import firebase from "firebase"
import {toast} from "react-hot-toast";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

// if there are no firebase app, initialize one
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const yahooAuthProvider = new firebase.auth.OAuthProvider('yahoo.com');
export const firestore = firebase.firestore()
export const storage = firebase.storage()

/**
 * convert a firestore document to json
 * @param doc
 * @returns {*&{createdAt: *}}
 */
export function dataToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
    }
}

export const signInWithProvider = async (provider) => {
    auth.signInWithPopup(provider).then((data) => {
        toast.success("Signed in")
    });
}