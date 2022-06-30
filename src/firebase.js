import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyACO6dBtKF7trOPjjlHCp_L_dyY4jaZ61E",
    authDomain: "react-blog-post-f82fb.firebaseapp.com",
    databaseURL: "https://react-blog-post-f82fb.firebaseio.com",
    projectId: "react-blog-post-f82fb",
    storageBucket: "react-blog-post-f82fb.appspot.com",
    messagingSenderId: "906393479947",
    appId: "1:906393479947:web:af3b9064adf04c4afa500e",
    measurementId: "G-8T2XE6HHN0"
};
firebase.initializeApp(config);
export default firebase;