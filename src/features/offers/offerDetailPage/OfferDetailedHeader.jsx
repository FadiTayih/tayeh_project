import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function OfferDetailedHeader() {
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image size='huge' src={`/assests/images/carImage1.png`} />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='large'
                  content='Offer Title'
                  style={{ color: 'white' }}
                />
                <p>Event Date</p>
                <p>
                  Offered by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom'>
        <Button>Cancel My Place</Button>
        <Button color='teal'>JOIN THIS Offer</Button>

        <Button as={Link} to={`/manage/`} color='orange' floated='right'>
          Manage Offer
        </Button>
      </Segment>
    </Segment.Group>
  );
}
