import React from 'react';
import OfferListInterest from './OfferListInterest';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { deleteOffer } from '../../offerActions';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

export default function OfferListItems({ offer }) {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      {/* main car image and date/area  */}
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size='large' src={offer.carPhotoURL} />
            <Item.Content>
              <Item.Header content={offer.brand} />
              <Item.Description>Car Name : {offer.name}</Item.Description>
              <Item.Description>Body Type: {offer.bodyType}</Item.Description>
              <Item.Description>Price: {offer.price}</Item.Description>
              <Item.Description>Mileage: {offer.mileage}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' />{' '}
          {format(offer.expiryDateofReg, 'MMMM d, yyyy h:mm a')}
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
        <div>Transmission: {offer.transmission}</div>
        <div>Condition : {offer.condition}</div>
        <div>Body Type : {offer.bodyType}</div>
        <div>Color : {offer.color}</div>
        <div>Fuel : {offer.fuel}</div>
        <div>Color : {offer.color}</div>
        <div>Country Manufacture : {offer.countryManufacture}</div>
        <div>Country Of Origin : {offer.countryOfOrigin}</div>
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
          onClick={() => dispatch(deleteOffer(offer.id))}
        />
      </Segment>
    </Segment.Group>
  );
}
