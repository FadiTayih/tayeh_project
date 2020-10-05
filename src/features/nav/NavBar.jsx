import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar({ setFormOpen }) {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img
            src='/assests/images/logo.png'
            alt='logo'
            style={{ marginRight: 15 }}
          />
          Tayeh
        </Menu.Item>
        <Menu.Item name='Cars' />
        <Menu.Item>
          <Button
            onClick={() => setFormOpen(true)}
            positive
            inverted
            content='Create a offer'
          />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button basic inverted content='Login' />
          <Button
            basic
            inverted
            content='Register'
            style={{ marginLeft: '0.5em' }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
