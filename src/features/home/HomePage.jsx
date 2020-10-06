import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

export default function HomePage({history}) {
  return (
    <Segment inverted vertical textAlign='center' className='mastHead'>
      <Container>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assests/images/logo.png'
            style={{ marginBottom: 15 }}
          />
          Tayeh
        </Header>

        {/* When clicked will push url to the path, in order to route to the offers page */}
        <Button onClick={() => history.push('/offers')}  size='huge' inverted>
          Get Started
          <Icon name='right arrow' inverted />
        </Button>

      </Container>
    </Segment>
  );
}
