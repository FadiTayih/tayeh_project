import { useField } from 'formik';
import React from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';

// reuseable text input
export default function SelectInput({ lable, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{lable}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
        fluid
        selection
      />

      {/* input validation */}
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
