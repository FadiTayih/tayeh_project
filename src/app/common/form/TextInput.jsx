import { useField } from 'formik';
import React from 'react';
import { FormField, Label } from 'semantic-ui-react';


// reuseable text input
export default function TextInput({ lable, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{lable}</label>
      <input {...field} {...props} />
      {/* input validation */}
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
