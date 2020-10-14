

import { toast } from 'react-toastify';
import firebase from '../config/fireBase';
import { setUserProfileFireBase } from './fireBaseService';

// authenicate and sign in the user
export function signInWithEmail(creds) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(creds.email, creds.password);
}

// sign out the user
export function signOutFireBase() {
  return firebase.auth().signOut();
}

// register a user
export async function registerToFireBase(creds) {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password);

    // after registering the user will be automically be login in
    await result.user.updateProfile({
      displayName: creds.displayName,
    });

    // create a new user profile document in the database
    return await setUserProfileFireBase(result.user);
  } catch (error) {
    throw error;
  }
}

// Social Logins
export async function socialLogins(selectedProvider) {
  let provider;
  if (selectedProvider === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
  }
  if (selectedProvider === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
  }
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileFireBase(result.user);
    }
  } catch (error) {
    toast.error(error.message);
  }
}

// Change user password
export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword);
}

// upload a new photo to the store
export function uploadToFireBaseStorage(file, fileName) {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();
  return storageRef.child(`${user.uid}/cars_photos/${fileName}`).put(file);
}

// delete photos from firesbase
export function deletePhotoFormFireBaseStorge(fileName) {
  const userUid = firebase.auth().currentUser.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/cars_photos/${fileName}`);
  return photoRef.delete();
}


