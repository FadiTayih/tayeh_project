import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';

export default function OfferForm({ setFormOpen }) {
  return (
    <Segment clearing>
      <Header content='Create new Offer' />
      <Form>
        <Form.Field>
          <input type='text' placeholder='Car Name' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='Car Category' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='Description' />
        </Form.Field>
        <Form.Field>
          <input type='text' placeholder='City' />
        </Form.Field>
        <Form.Field>
          <input type='number' placeholder='VIN' />
        </Form.Field>
        <Form.Field>
          <input type='date' placeholder='Date' />
        </Form.Field>
        <Button type='submit' positive floated='right' content='Submit' />
        <Button
          onClick={() => setFormOpen(false)}
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
