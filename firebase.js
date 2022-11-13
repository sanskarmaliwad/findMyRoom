import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDQ2Nj52OECaV6ZBOAKkJuwRK-yQSHHt_o",
    authDomain: "roomwalalatest-10-11-22.firebaseapp.com",
    projectId: "roomwalalatest-10-11-22",
    storageBucket: "roomwalalatest-10-11-22.appspot.com",
    messagingSenderId: "74098765197",
    appId: "1:74098765197:web:e030e480c16cf2ef4ce1c4",
    measurementId: "G-88HVN67QJW"
  };

  let app;
  if(firebase.apps.length===0){
      app = firebase.initializeApp(firebaseConfig);
  }
  else{
      app = firebase.app();
  }
  const auth = firebase.auth()
  const store = firebase.firestore();
  const storage = firebase.storage();
  export  { auth, store, storage, firebaseConfig};