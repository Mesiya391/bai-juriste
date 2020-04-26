import firebase from "firebase";
//import firestore from "firebase/firestore"

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBDOnGtV-cYFF9GA7QZa_DGT-2g0shkP3o",
    authDomain: "juriste-150a3.firebaseapp.com",
    databaseURL: "https://juriste-150a3.firebaseio.com",
    projectId: "juriste-150a3",
    storageBucket: "juriste-150a3.appspot.com",
    messagingSenderId: "724451470704",
    appId: "1:724451470704:web:d34ec7930914068f3033b5",
    measurementId: "G-24HLQ9W8W4"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//jakby firestore wybijał błąd, spróbuj usunąć poniższą linijke kodu:
//firebaseApp.firestore().settings({ timestampsInSnapshots: true});

// export firestore database
export default firebaseApp.firestore()