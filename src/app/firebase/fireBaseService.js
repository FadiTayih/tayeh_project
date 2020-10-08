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

// connecting to the collection in fireStore
export function listenToOffersFromFireBase() {
  return db.collection('offers');
}

// connecting to the document in firebase
export function listentoOfferFromFireBase(offerId) {
  return db.collection('offers').doc(offerId);
}
