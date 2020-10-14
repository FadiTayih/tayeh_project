import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feed, Header, Segment } from 'semantic-ui-react';
import { listenToFeeds } from '../../profiles/ProfileActions';
import {
  firebaseObjectToArray,
  getUserFeeds,
} from '../../../app/firebase/fireBaseService';
import OfferFeedItems from './OfferFeedItems';

export default function OfferFeeds() {
  const dispatch = useDispatch();

  //   get the posts news
  const { feeds } = useSelector((state) => state.profile);

  //   mount
  useEffect(() => {
    getUserFeeds().on('value', (snapshot) => {
      if (!snapshot.exists()) {
        return;
      }
      const feed = firebaseObjectToArray(snapshot.val()).reverse();
      dispatch(listenToFeeds(feed));
    });

    // unmount
    return () => {
      getUserFeeds().off();
    };
  }, [dispatch]);
  return (
    <>
      <Header attached color='teal' icon='newspaper' content='News feed' />
      <Segment attached='bottom'>
        {feeds.length > 0 ? (
          <Feed>
            {feeds.map((post) => (
              <OfferFeedItems posts={post} key={post.id} />
            ))}
          </Feed>
        ) : (
          <p>No News</p>
        )}
      </Segment>
    </>
  );
}
