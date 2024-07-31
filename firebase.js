// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg8vy7_vu9AQVXcnBPQE7vAp5QXmRbyGo",
    authDomain: "pantry-tracker-b6377.firebaseapp.com",
    projectId: "pantry-tracker-b6377",
    storageBucket: "pantry-tracker-b6377.appspot.com",
    messagingSenderId: "932801857700",
    appId: "1:932801857700:web:152b6471594a5b08317e31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);


export { firestore }