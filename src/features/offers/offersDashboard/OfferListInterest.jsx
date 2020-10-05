import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default function OfferListInterest({ interest }) {
  return (
    <List.Item>
      <Image src={interest.photoURL} size='mini' circular />
    </List.Item>
  );
}
