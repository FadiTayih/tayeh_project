import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogins } from '../../app/firebase/fireStoreService';

export default function SocialLogin() {
  const dispatch = useDispatch();

  function handleSocialLogins(provider) {
    dispatch(closeModal());
    socialLogins(provider);
  }
  return (
    <>
      <Button
        icon='facebook'
        color='facebook'
        style={{ marginBottom: 10 }}
        fluid
        content='Login in with Facebook'
        onClick={() => handleSocialLogins('facebook')}
      />
      <Button
        icon='google'
        color='google plus'
        fluid
        content='Login in with Google'
        onClick={() => handleSocialLogins('google')}
      />
    </>
  );
}
