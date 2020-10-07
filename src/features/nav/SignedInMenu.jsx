import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, Image, Menu } from 'semantic-ui-react';
import { signOutUser } from '../auth/authActions';

export default function SignedInMenu() {
  // in order to access the history props for routing
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // If the user is signed in, display the photo and email
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUser.photoURL || '/assests/images/user.png'}
      />
      <Dropdown pointing='top right' text={currentUser.email}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createOffer'
            text='Create Offer'
            icon='plus'
          />
          <Dropdown.Item text='User Profile' icon='user' />

          {/* when pressed the user will be signed out */}
          <Dropdown.Item
            onClick={() => {
              dispatch(signOutUser());
              history.push('/');
            }}
            text='Sign Out'
            icon='power'
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
