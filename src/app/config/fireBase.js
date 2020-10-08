import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const fireBaseConfig = {
  apiKey: 'AIzaSyBBN3RfM_i5qOiTXBTCpiDfDMnOii8hvQY',
  authDomain: 'tayeh-eab7b.firebaseapp.com',
  databaseURL: 'https://tayeh-eab7b.firebaseio.com',
  projectId: 'tayeh-eab7b',
  storageBucket: 'tayeh-eab7b.appspot.com',
  messagingSenderId: '88295264515',
  appId: '1:88295264515:web:1357e30f0baec1a5605936',
};

firebase.initializeApp(fireBaseConfig);
firebase.firestore();

export default firebase;
