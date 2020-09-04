import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA5fvyjkiC5oSC4x3BdJE2Ux_aNnP-JKmo",
    authDomain: "instagram-clone-react-783fd.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-783fd.firebaseio.com",
    projectId: "instagram-clone-react-783fd",
    storageBucket: "instagram-clone-react-783fd.appspot.com",
    messagingSenderId: "665382066961",
    appId: "1:665382066961:web:5f50fd08166afa95abcab0",
    measurementId: "G-TVFZVEPRRS"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

