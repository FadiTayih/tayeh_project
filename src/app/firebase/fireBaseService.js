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

// change the values coming from firesbase from objects to arrays
export function firebaseObjectToArray(snapshot) {
  if (snapshot) {
    return Object.entries(snapshot).map((e) =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
}

// listing and getting the offers and filter the offers based on the predicates
export function listenToOffersFromFireBase(predicates) {
  const user = firebase.auth().currentUser;
  const offerRef = db.collection('offers');

  switch (predicates.get('filter')) {
    case 'isInterested':
      return offerRef.where('interestedIds', 'array-contains', user.uid);
    case 'isHosting':
      return offerRef.where('hostUid', '==', user.uid);
    default:
      return offerRef;
  }
}

// connecting to the document in firebase
export function listentoOfferFromFireBase(offerId) {
  return db.collection('offers').doc(offerId);
}

// add doc to firebase
export function addOfferToFireBase(offer) {
  const user = firebase.auth().currentUser;
  return db.collection('offers').add({
    ...offer,
    createdBy: user.displayName,
    hostUid: user.uid,
    carPhotoURL: user.photoURL || null,
    interested: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL || null,
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

// update user profile photo
export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection('users').doc(user.uid);

  try {
    const userDoc = await userDocRef.get();
    //  If the user does not have a default main photo then update it with the new photo
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
}

// get the user photos
export function getUserPhotos(userId) {
  return db.collection('users').doc(userId).collection('photos');
}

// set the main photo of the user
export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser;

  try {
    await db.collection('users').doc(user.uid).update({
      photoURL: photo.url,
    });
    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
}

// delete the photos from the user colleciton
export function deletePhotoFromColleciton(photoId) {
  const userId = firebase.auth().currentUser.uid;
  return db
    .collection('users')
    .doc(userId)
    .collection('photos')
    .doc(photoId)
    .delete();
}

// user join an offer
export function addUserToInterestList(offer) {
  const user = firebase.auth().currentUser;

  return db
    .collection('offers')
    .doc(offer.id)
    .update({
      interested: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        name: user.displayName,
        photoURL: user.photoURL || null,
      }),
      // used to query, to find which user with his id is interested
      interestedIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
    });
}

// user cancel their place in an offer
export async function cancelUserPlaceInInterestList(offer) {
  const user = firebase.auth().currentUser;

  try {
    // in order to remove an object from array, we need it reference
    const offerDoc = await db.collection('offers').doc(offer.id).get();
    return db
      .collection('offers')
      .doc(offer.id)
      .update({
        interestedIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        interested: offerDoc
          .data()
          .interested.filter((interest) => interest.id !== user.uid),
      });
  } catch (error) {
    throw error;
  }
}

// chat/ comment section / reply
export function addOfferChatComment(offerId, values) {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };
  return firebase.database().ref(`chat/${offerId}`).push(newComment);
}

// get the comment from firebase
export function getOfferChatRef(offerId) {
  return firebase.database().ref(`chat/${offerId}`).orderByKey();
}
