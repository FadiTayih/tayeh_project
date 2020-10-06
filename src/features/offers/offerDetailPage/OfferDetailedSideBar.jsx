import React from 'react';
import { Segment, Item } from 'semantic-ui-react';

export default function OfferDetailedSideBar() {
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
        2 people are interested
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='tiny' src='/assests/images/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <span>Tom</span>
              </Item.Header>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Item.Image size='tiny' src='/assests/images/user.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <span>Bob</span>
              </Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </>
  );
}
