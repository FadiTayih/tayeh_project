import { Form, Formik } from 'formik';
import React from 'react';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';

export default function ProfileForm({ profile }) {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description,
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className='ui form'>
          <TextInput name='displayName' placeholder='Display Name' />
          <TextArea name='description' placeholder='Description ' />
          <Button
            loading={isSubmitting}
            disabled={isSubmitting || !isValid || !dirty}
            floated='right'
            type='submit'
            positive
            content='Update Profile'
            size='large'
          />
        </Form>
      )}
    </Formik>
  );
}
