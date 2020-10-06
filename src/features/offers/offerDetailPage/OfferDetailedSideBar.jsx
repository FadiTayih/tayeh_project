import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

export default function OfferDetailedSideBar({ interested }) {
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
            <Item key={interest.id} style={{ position: 'relative' }}>
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
