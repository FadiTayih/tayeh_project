import { Field, Form, Formik } from 'formik';
import React from 'react';
import { toast } from 'react-toastify';
import { Loader } from 'semantic-ui-react';
import { addOfferChatComment } from '../../../app/firebase/fireBaseService';
import * as Yup from 'yup';

export default function OfferDetailChatForm({ offerId, parentId, closeForm }) {
  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addOfferChatComment(offerId, { ...values, parentId });
          resetForm();
        } catch (error) {
          toast.error(error.message);
        } finally {
          setSubmitting(false);
          closeForm({ open: false, commentId: null });
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className='ui form'>
          <Field name='comment'>
            {({ field }) => (
              <div style={{ position: 'relative' }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows={2}
                  {...field}
                  placeholder='Enter your comment here (Press Enter to 
                    submit and shit enter for new line)'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.shiftKey) return;
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
}
