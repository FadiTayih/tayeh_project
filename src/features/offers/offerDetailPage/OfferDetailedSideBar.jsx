import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Label } from 'semantic-ui-react';

export default function OfferDetailedSideBar({ interested, hostUid }) {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {/* How many people are interested */}
        {interested.length} {interested.length > 1 ? 'people' : 'person'} are
        interested
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {/* Loop throught the interested people */}
          {interested.map((interest) => (
            // each item is a link to the user profile
            <Item
              as={Link}
              to={`/profile/${interest.id}`}
              key={interest.id}
              style={{ position: 'relative' }}
            >
              {/* If the user is the host, show this ribbon message */}
              {hostUid === interest.id && (
                <Label
                  style={{ position: 'absolute' }}
                  ribbon='right'
                  color='blue'
                  content='Host'
                />
              )}
              {/* interested photos */}
              <Item.Image
                size='tiny'
                src={interest.photoURL || '/assests/images/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <span>{interest.name}</span>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
}
