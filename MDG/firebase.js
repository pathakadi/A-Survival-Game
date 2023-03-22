// Firebase DB

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDF7vADwUuW3gkK2HSxvcFRkwPx_h2AUD4",
    authDomain: "eatrunburn-24c4a.firebaseapp.com",
    databaseURL: "https://eatrunburn-24c4a-default-rtdb.firebaseio.com",
    projectId: "eatrunburn-24c4a",
    storageBucket: "eatrunburn-24c4a.appspot.com",
    messagingSenderId: "814557443719",
    appId: "1:814557443719:web:f1ef30f8885b2594b72a22"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const submit = document.getElementById("submit") ;

submit.addEventListener("click" , ()=>{
    console.log("hi") ;
    var user_name = document.getElementById("user").value ;
    var score = document.getElementById("finalScore").innerHTML ;

    console.log(user_name,score) ;

    const cityRef = doc(db, user_name , score);
    setDoc(cityRef, { capital: true }, { merge: true });
})