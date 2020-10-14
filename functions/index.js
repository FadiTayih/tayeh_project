const functions = require('firebase-functions');

// give full permission to app 'admin/
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// when user follow another user this function will be triggered
// specify a document with URL, in-order to trigger onCreate
//  the snapshot is the document coming from URL
//  context can access the ids 'userUid'..
exports.addFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onCreate(async (snapsnot, context) => {
    const following = snapsnot.data();
    console.log({ following });

    try {
      const userDoc = await db
        .collection('users')
        .doc(context.params.userUid)
        .get();

      // user batch to make sure that all transactions are successful
      const batch = db.batch();

      batch.set(
        db
          .collection('following')
          .doc(context.params.profileId)
          .collection('userFollower')
          .doc(context.params.userUid),
        {
          displayName: userDoc.data().displayName,
          photoURL: userDoc.data().photoURL,
          uid: userDoc.id,
        }
      );
      // increment the follower count
      batch.update(db.collection('users').doc(context.params.profileId), {
        followerCount: admin.firestore.FieldValue.increment(1),
      });
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

// when user unfollow another user this function will be triggered
exports.removeFollowing = functions.firestore
  .document('following/{userUid}/userFollowing/{profileId}')
  .onDelete(async (snapsnot, context) => {
    const batch = db.batch();
    batch.delete(
      db
        .collection('following')
        .doc(context.params.profileId)
        .collection('userFollower')
        .doc(context.params.userUid)
    );

    // decrement the follower count
    batch.update(db.collection('users').doc(context.params.profileId), {
      followerCount: admin.firestore.FieldValue.increment(-1),
    });

    try {
      return await batch.commit();
    } catch (error) {
      return console.log(error);
    }
  });

// when offer is updated is updated this function will be triggered (News Feed)
exports.offerUdpated = functions.firestore
  .document('offers/{offerId}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.data();
    const after = snapshot.after.data();

    // check if someone has join the interest list
    if (before.interested.length < after.interested.length) {
      let interestedJoined = after.interested.filter(
        (item1) => !before.interested.some((item2) => item2.id === item1.id)
      )[0];
      console.log({ interestedJoined });

      try {
        const followerDocs = await db
          .collection('following')
          .doc(interestedJoined.id)
          .collection('userFollower')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                interestedJoined,
                'join-offer',
                context.params.offerId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }

    // check if someone has left the interest list
    if (before.interested.length > after.interested.length) {
      let interestedLeft = before.interested.filter(
        (item1) => !after.interested.some((item2) => item2.id === item1.id)
      )[0];
      console.log({ interestedLeft });

      try {
        const followerDocs = await db
          .collection('following')
          .doc(interestedLeft.id)
          .collection('userFollower')
          .get();
        followerDocs.forEach((doc) => {
          admin
            .database()
            .ref(`/posts/${doc.id}`)
            .push(
              newPost(
                interestedLeft,
                'leave-offer',
                context.params.offerId,
                before
              )
            );
        });
      } catch (error) {
        return console.log(error);
      }
    }
    return console.log('finished');
  });

// function that maps and return a new post object
function newPost(user, code, offerId, offer) {
  return {
    photoURL: user.photoURL,
    title: offer.name,
    data: admin.database.ServerValue.TIMESTAMP,
    code,
    displayName: user.name,
    offerId,
    userUid: user.id,
  };
}
