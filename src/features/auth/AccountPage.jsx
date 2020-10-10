import { Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import TextInput from '../../app/common/form/TextInput';
import { updateUserPassword } from '../../app/firebase/fireStoreService';

export default function AccountPage() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Segment>
      <Header dividing size='large' content='Account' />

      {/* If the user is login in with his email then display this form */}
      {currentUser.providerId === 'password' && (
        <>
          <Header color='teal' content='Change Password' />
          <p>Use this form to change your password</p>
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={Yup.object({
              newPassword: Yup.string().required('Password is required'),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref('newPassword'), null],
                'Password doest not match'
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                await updateUserPassword(values);
                setSubmitting(false);
              } catch (error) {
                setErrors(error);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, errors }) => (
              <Form className='ui form'>
                <TextInput
                  name='newPassword'
                  type='password'
                  placeholder='New Password'
                />
                <TextInput
                  name='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                />
                {errors.auth && (
                  <Label
                    basic
                    color='red'
                    style={{ marginBottom: 10 }}
                    content={errors.auth}
                  />
                )}

                <Button
                  style={{ display: 'block' }}
                  loading={isSubmitting}
                  type='submit'
                  disabled={!isValid || !dirty || isSubmitting}
                  positive
                  size='large'
                  content='Update Password'
                />
              </Form>
            )}
          </Formik>
        </>
      )}

      {/* If the user is login in with facebook then display this part */}
      {currentUser.providerId === 'facebook.com' && (
        <>
          <Header color='teal' sub content='Facebook Account' />
          <p>Please visit facebook to update password</p>
          <Button
            icon='facebook'
            color='facebook'
            as={Link}
            to='https://facebook.com'
            content='Go to Facebook'
          />
        </>
      )}

      {/* If the user is login in with google then display this part */}
      {currentUser.providerId === 'google.com' && (
        <>
          <Header color='teal' sub content='Google Account' />
          <p>Please visit google to update password</p>
          <Button
            icon='google'
            color='google plus'
            as={Link}
            to='https://google.com'
            content='Go to Google'
          />
        </>
      )}
    </Segment>
  );
}
