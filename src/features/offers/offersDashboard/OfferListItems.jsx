import React from 'react';
import OfferListInterest from './OfferListInterest';
import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteOfferInFireBase } from '../../../app/firebase/fireBaseService';

export default function OfferListItems({ offer }) {
  return (
    <Segment.Group>
      {/* main car image and date/area  */}
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='large' src={offer.carPhotoURL} />
            <Item.Content>
              {offer.isCancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon='right'
                  color='red'
                  content='This offer has been cancelled'
                />
              )}
              <Item.Header>
                <div className='ui floating message'>
                  <p>{offer.brand}</p>
                </div>
              </Item.Header>
              <Item.Description>
                <div className='ui floating message'>
                  <strong> {offer.name}</strong>
                </div>
              </Item.Description>
              <Item.Description>
                <div className='ui floating message'>
                  <strong>
                    {' '}
                    <i className='car icon'></i> {offer.bodyType}
                  </strong>
                </div>
              </Item.Description>
              <Item.Description>
                <div className='ui floating message'>
                  <strong>
                    {' '}
                    <i className='dollar sign icon'></i> {offer.price}
                  </strong>
                </div>
              </Item.Description>
              <Item.Description>
                <div className='ui floating message'>
                  <strong>
                    {' '}
                    <i className='road icon'></i> {offer.mileage}
                  </strong>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
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
        <Button
          color='teal'
          floated='right'
          content='view'
          as={Link}
          to={`/offers/${offer.id}`}
        />
        <Button
          color='red'
          floated='right'
          content='delete'
          onClick={() => deleteOfferInFireBase(offer.id)}
        />
      </Segment>
    </Segment.Group>
  );
}
