import React from 'react';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';

export default function ProfileHeader({ profile, isCurrentUser }) {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || '/assests/images/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Interest' value={10} />
            <Statistic label='Interested' value={5} />
          </Statistic.Group>
          {/* only display this if your checking others users profiles */}
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button fluid color='teal' content='Follow' />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  <Button fluid color='teal' content='UnFollow' />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
