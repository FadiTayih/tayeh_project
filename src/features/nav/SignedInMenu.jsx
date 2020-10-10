import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutFireBase } from '../../app/firebase/fireStoreService';

export default function SignedInMenu() {
  // in order to access the history props for routing
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  async function handleSignOut() {
    try {
      history.push('/');
      await signOutFireBase();
    } catch (error) {
      toast.error(error.message);
    }
  }

  // If the user is signed in, display the photo and name
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assests/images/user.png'}
      />
      <Dropdown pointing='top right' text={currentUser.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createOffer'
            text='Create Offer'
            icon='plus'
          />
          <Dropdown.Item text='User Profile' icon='user' />

          {/* To update User account */}
          <Dropdown.Item
            as={Link}
            to='/accounts'
            text='My account'
            icon='settings'
          />

          {/* when pressed the user will be signed out */}
          <Dropdown.Item onClick={handleSignOut} text='Sign Out' icon='power' />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
