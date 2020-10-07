import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

export default function NavBar() {
  // get the auth state from redux
  const { authenicated } = useSelector((state) => state.auth);

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

        {authenicated ? <SignedInMenu /> : <SignedOutMenu />}
      </Container>
    </Menu>
  );
}
