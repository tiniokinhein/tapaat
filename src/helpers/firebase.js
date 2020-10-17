import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyB9HJbScIUjOlX-iyv7_iO94pF7HVmjVsY",
    authDomain: "tapaat-f8344.firebaseapp.com",
    databaseURL: "https://tapaat-f8344.firebaseio.com",
    projectId: "tapaat-f8344",
    storageBucket: "tapaat-f8344.appspot.com",
    messagingSenderId: "931517354545",
    appId: "1:931517354545:web:fcde2d9a04c01438697b10"
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = firebase.database()