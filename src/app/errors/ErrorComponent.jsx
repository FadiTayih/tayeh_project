import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder style={{ marginTop: 110 }}>
      <Header
        textAlign='center'
        content={error?.message || 'Something went wrong'}
      />
      <Button
        as={Link}
        to='/offers'
        primary
        style={{ marginTop: 20 }}
        content='return back'
      />
    </Segment>
  );
}
