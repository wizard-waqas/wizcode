import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA8mp4GIhI7o5T-1_GfzpER09HUmTe-9ts",
    authDomain: "wizcode-53930.firebaseapp.com",
    projectId: "wizcode-53930",
    storageBucket: "wizcode-53930.appspot.com",
    messagingSenderId: "948374701792",
    appId: "1:948374701792:web:0046bbdcd6fb820220b285",
    measurementId: "G-3LHB93RNBX"
};

// if there are no firebase app, initialize one
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore()
export const storage = firebase.storage()

/**
 * convert a firestore document to json
 * @param doc
 * @returns {*&{createdAt: *}}
 */
export function lessonToJSON(doc) {
    const data = doc.data();
    return {
        ...data,
    }
}