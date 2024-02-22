// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"  
import { getAuth } from "firebase/auth"  
import { getFirestore } from "firebase/firestore"  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyC0IvR1BWYeTEQWl9FJGHHHf59IS4CPEgI",
    authDomain: "cooktab-f0fa3.firebaseapp.com",
    projectId: "cooktab-f0fa3",
    storageBucket: "cooktab-f0fa3.appspot.com",
    messagingSenderId: "500894434039",
    appId: "1:500894434039:web:d739c9fc72a7e7787a49f2",
    measurementId: "G-5RC1EWVXSK",
}  

// Initialize Firebase
const app = initializeApp(firebaseConfig)  

export const auth = getAuth(app)  
export const db = getFirestore()  
export default app  
