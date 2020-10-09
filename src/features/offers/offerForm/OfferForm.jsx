import React, { useState } from 'react';
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { LogoData } from '../../../app/api/CarsLogoOptions';
import { bodyType } from '../../../app/api/bodyType';
import { transmission } from '../../../app/api/transmission';
import { mileage } from '../../../app/api/mileage';
import { condition } from '../../../app/api/condition';
import DateInput from '../../../app/common/form/DateInput';
import useFireStoreDoc from '../../../app/hooks/useFireStoreDoc';
import {
  addOfferToFireBase,
  cancelOfferInFireBase,
  listentoOfferFromFireBase,
  updateOfferInFireBase,
} from '../../../app/firebase/fireBaseService';
import { listenToOffers } from '../../offerActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';

export default function OfferForm({ match, history }) {
  // offer is the name of reducer, offers is the name of the state,
  // find the id from the url params and match it with id in the redux store
  const selectedOffer = useSelector((state) =>
    state.offer.offers.find((e) => e.id === match.params.id)
  );

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  // handle the offer cancel
  async function handleOfferCancel(offer) {
    setConfirmCancel(false);
    setLoadingCancel(true);

    try {
      await cancelOfferInFireBase(offer);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      toast.error(error.message);
    }
  }

  // if the selectedOffer is null, then use the empty object
  const initialValues = selectedOffer ?? {
    brand: '',
    name: '',
    modelYear: '',
    mileage: '',
    price: '',
    transmission: '',
    condition: '',
    bodyType: '',
    fuel: '',
    color: '',
    countryManufacture: '',
    countryOfOrigin: '',
    expiryDateofReg: '',
    options: '',
    city: '',
    vin: '',
  };

  // package used for validation
  const validationSchema = Yup.object({
    brand: Yup.string().required('Brand name is required'),
    name: Yup.string().required('Car name is required'),
    modelYear: Yup.string().required(),
    mileage: Yup.string().required(),
    price: Yup.string().required(),
    transmission: Yup.string().required(),
    condition: Yup.string().required(),
    bodyType: Yup.string().required(),
    fuel: Yup.string().required(),
    color: Yup.string().required(),
    countryManufacture: Yup.string().required(),
    countryOfOrigin: Yup.string().required(),
    expiryDateofReg: Yup.string().required(),
    options: Yup.string().required(),
    city: Yup.string().required(),
    vin: Yup.string().required(),
  });

  //  custom hooks to get document from fireStore, if the redux store
  // does not have the offer
  useFireStoreDoc({
    shouldExectue: !!match.params.id,
    query: () => listentoOfferFromFireBase(match.params.id),
    data: (offer) => dispatch(listenToOffers([offer])),
    deps: [match.params.id, dispatch],
  });

  // check if is it loading
  if (loading) return <LoadingComponent content='Loading Offers....' />;

  // if there is an error
  if (error) return <Redirect to='/errors' />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // submiting the form to fireStore
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // if the offer form is selected then update else add a new offer
            selectedOffer
              ? await updateOfferInFireBase(values)
              : await addOfferToFireBase(values);
            setSubmitting(false);
            history.push('/offers');
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {/* Main Form Validation */}
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content='Offer Details' />
            <SelectInput name='brand' placeholder='Brand' options={LogoData} />
            <TextInput name='name' placeholder='Car Name' />
            <TextInput name='modelYear' placeholder='Model Year' />
            <SelectInput
              name='mileage'
              placeholder='Mileage'
              options={mileage}
            />
            <TextInput name='price' placeholder='Price' />
            <SelectInput
              name='transmission'
              placeholder='Transmission'
              options={transmission}
            />
            <SelectInput
              name='condition'
              placeholder='Condition'
              options={condition}
            />
            <SelectInput
              name='bodyType'
              placeholder='BodyType'
              options={bodyType}
            />
            <TextInput name='fuel' placeholder='Fuel' />
            <TextInput name='color' placeholder='Color' />
            <TextInput name='countryOfOrigin' placeholder='Country Of Origin' />
            <TextInput
              name='countryManufacture'
              placeholder='country of Manufacture'
            />
            <TextArea name='options' placeholder='Options' rows={3} />
            <Header sub color='teal' content='Offer Location Details' />
            <TextInput name='city' placeholder='City' />
            <TextInput name='vin' placeholder='Vin' />
            <DateInput
              name='expiryDateofReg'
              placeholderText='Expiry of Reg. Insurance'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              positive
              floated='right'
              content='Submit'
            />
            {selectedOffer && (
              <Button
                loading={loadingCancel}
                type='button'
                floated='left'
                color={selectedOffer.isCancelled ? 'green' : 'red'}
                content={
                  selectedOffer.isCancelled ? 'Reactive' : 'Cancel Offer'
                }
                onClick={() => setConfirmCancel(true)}
              />
            )}
            <Button
              disabled={isSubmitting}
              as={Link}
              to={'/offers'}
              type='submit'
              floated='right'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
      {/* Confirm message for cancel */}
      <Confirm
        content={
          selectedOffer?.isCancelled
            ? 'This will reactive your offer - are you sure?'
            : 'This will cancel your offer - are your sure'
        }
        open={confirmCancel}
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => handleOfferCancel(selectedOffer)}
      />
    </Segment>
  );
}
