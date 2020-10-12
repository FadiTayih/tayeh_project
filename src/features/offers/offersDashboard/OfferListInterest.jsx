import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

export default function OfferListInterest({ interest }) {
  return (
    <List.Item as={Link} to={`/profile/${interest.id}`}>
      <Image src={interest.photoURL} size='mini' circular />
    </List.Item>
  );
}
