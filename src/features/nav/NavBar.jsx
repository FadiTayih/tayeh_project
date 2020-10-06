import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar() {
  // custom hook from react to enable the use of the history prop in navBar
  const history = useHistory();

  // Check if the user is authenicated
  const [authenicated, setAuthencated] = useState(false);

  // handle user sign out
  function handleSignOut() {
    setAuthencated(false);
    history.push('/');
  }

  return (
    <Menu inverted fixed='top'>
      <Container>
        {/* Main logo which route to the main page */}
        <Menu.Item as={NavLink} exact to='/' header>
          <img
            src='/assests/images/logo.png'
            alt='logo'
            style={{ marginRight: 15 }}
          />
          Tayeh
        </Menu.Item>
        {/* route to the offers */}
        <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
        <Menu.Item as={NavLink} to='/offers' name='Cars' />

        {/* route to create offer page */}
        {authenicated && (
          <Menu.Item as={NavLink} to='/createOffer'>
            <Button positive inverted content='Create a offer' />
          </Menu.Item>
        )}

        {authenicated ? (
          <SignedInMenu signOut={handleSignOut} />
        ) : (
          <SignedOutMenu setAuthencated={setAuthencated} />
        )}
      </Container>
    </Menu>
  );
}
