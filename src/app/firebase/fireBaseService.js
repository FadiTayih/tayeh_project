import cuid from 'cuid';
import firebase from '../config/fireBase';

const db = firebase.firestore();

// Helps reshap the data from fireStore (give a unique id)
export function dataFromFireStore(snapShot) {
  if (!snapShot) return undefined;
  const data = snapShot.data();

  //   change firebase timeStamp to date format
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapShot.id,
  };
}

// listing and getting the offers
export function listenToOffersFromFireBase() {
  return db.collection('offers');
}

// connecting to the document in firebase
export function listentoOfferFromFireBase(offerId) {
  return db.collection('offers').doc(offerId);
}

// add doc to firebase
export function addOfferToFireBase(offer) {
  return db.collection('offers').add({
    ...offer,
    createdBy: 'Bob',
    carPhotoURL: '/assests/images/carImage1.png',
    interested: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      name: 'jeans',
      photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    }),
  });
}

// update doc in firebase
export function updateOfferInFireBase(offer) {
  return db.collection('offers').doc(offer.id).update(offer);
}

// delete an offer
export function deleteOfferInFireBase(offerId) {
  return db.collection('offers').doc(offerId).delete();
}

// cancel an offer
export function cancelOfferInFireBase(offer) {
  return db.collection('offers').doc(offer.id).update({
    isCancelled: !offer.isCancelled,
  });
}

// Create new user profile document in the databse
export function setUserProfileFireBase(user) {
  return db
    .collection('users')
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

// get the current user profile
export function getUserProfile(userId) {
  return db.collection('users').doc(userId);
}

// update user profile
export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser;

  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      });
    }
    return await db.collection('users').doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}
