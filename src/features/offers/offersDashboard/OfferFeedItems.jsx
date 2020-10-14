import React from 'react';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';

export default function OfferFeedItems({ posts }) {
  let summary;

  switch (posts.code) {
    case 'join-offer':
      summary = (
        <>
          <Link to={`/profile/${posts.userUid}`}>{posts.displayName}</Link> has
          signed up to <Link to={`/offers/${posts.offerId}`}>{posts.title}</Link>
        </>
      );
      break;
    case 'leave-offer':
      summary = (
        <>
          <Link to={`/profile/${posts.userUid}`}>{posts.displayName}</Link> has
          canceled to <Link to={`/offers/${posts.offerId}`}>{posts.title}</Link>
        </>
      );
      break;
    default:
      summary = 'somthing happened';
      break;
  }

  return (
    <Feed.Event>
      <Feed.Label image={posts.photoURL} />
      <Feed.Content>
        <Feed.Date>
          {formatDistance(new Date(posts.data), new Date())} ago
        </Feed.Date>
        <Feed.Summary>{summary}</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}
