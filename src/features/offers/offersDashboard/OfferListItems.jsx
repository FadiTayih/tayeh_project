import React from 'react';
import OfferListInterest from './OfferListInterest';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';

export default function OfferListItems({ offer }) {
  return (
    <Segment.Group>
      {/* main car image and date/area  */}
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='large' src={offer.carPhotoURL} />
            <Item.Content>
              <Item.Header content={offer.title} />
              <Item.Description>Offer by {offer.createdBy}</Item.Description>
              <Item.Description>Category: {offer.category}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {offer.date}
          <Icon name='marker' /> {offer.city}
        </span>
      </Segment>

      {/* Loop thorugh offer props and past it to the offerListInterest component  */}
      <Segment secondary>
        <List horizontal>
          {offer.interested.map((interest) => (
            <OfferListInterest key={interest.id} interest={interest} />
          ))}
        </List>
      </Segment>

      {/* Button */}
      <Segment clearing>
        <div>{offer.description}</div>
        <Button color='teal' floated='right' content='view' />
      </Segment>
    </Segment.Group>
  );
}
