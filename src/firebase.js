import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBcQ8UwvXXfF-S9BEunFczqwNKaTF7fpAI",
    authDomain: "vivero-a315f.firebaseapp.com",
    projectId: "vivero-a315f",
    storageBucket: "vivero-a315f.appspot.com",
    messagingSenderId: "432796825142",
    appId: "1:432796825142:web:33dc0b08d2720499960a97",
    measurementId: "G-EE11BS0EBM"
};
firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;
