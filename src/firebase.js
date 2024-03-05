import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC32p4sfYt_wuxAUupk9xAQWEJeLoBqp_8",
    authDomain: "todolist-app-601a4.firebaseapp.com",
    projectId: "todolist-app-601a4",
    storageBucket: "todolist-app-601a4.appspot.com",
    messagingSenderId: "532201738628",
    appId: "1:532201738628:web:8c09d9ca1ff20f61c84dd1",
    measurementId: "G-B3FN9LBN5D"
  };

  // initialize firebase and firestore
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  export{db}