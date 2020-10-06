import React, { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOffer, updateOffer } from '../../offerActions';

export default function OfferForm({ match, history }) {
  // offer is the name of reducer, offers is the name of the state,
  // find the id from the url params and match it with id in the redux store
  const selectedOffer = useSelector((state) =>
    state.offer.offers.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();

  // if the selectedOffer is null, then use the empty object
  const initialValues = selectedOffer ?? {
    name: '',
    category: '',
    description: '',
    city: '',
    vin: '',
    date: '',
  };

  // Used for two way binding
  const [values, setValues] = useState(initialValues);

  // submit the form and close the form, if selected offer
  // is not null then when press submit update the offer
  function handFormSubmit() {
    selectedOffer
      ? dispatch(updateOffer({ ...selectedOffer, ...values }))
      : dispatch(
          createOffer({
            ...values,
            id: cuid(),
            createdBy: 'Bob',
            interested: [],
            carPhotoURL: '/assests/images/carImage1.png',
          })
        );
    history.push('/offers');
  }

  // handle the input change, two way binding
  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <Segment clearing>
      <Header content={selectedOffer ? 'Edit the Offer' : 'Create new Offer'} />
      <Form onSubmit={handFormSubmit}>
        <Form.Field>
          <input
            type='text'
            placeholder='Car Name'
            name='name'
            value={values.name}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Car Category'
            name='category'
            value={values.category}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={values.description}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='City'
            name='city'
            value={values.city}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            placeholder='VIN'
            name='vin'
            value={values.vin}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            placeholder='Date'
            name='date'
            value={values.date}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Field>
        <Button type='submit' positive floated='right' content='Submit' />
        <Button
          as={Link}
          to={'/offers'}
          type='submit'
          floated='right'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
}
