import React from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';

export default function OfferDetailedInfo({ offer }) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>VIN : {offer.vin}</p>
            <p>Options : {offer.options}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              Expiry of Reg. Insurance:{' '}
              {format(offer.expiryDateofReg, 'MMMM d, yyyy h:mm a')}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              Area: {offer.city} {offer.area}
            </span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color='teal' size='tiny' content='Show Map' />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
}
