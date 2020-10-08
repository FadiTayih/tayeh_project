import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function OfferFilter() {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All Offers' />
        <Menu.Item content="I'm Interested In" />
        <Menu.Item content="I'm Offering" />
      </Menu>
      <Header icon='calendar' attached color="teal" content='Select Date'  />
      <Calendar />
    </>
  );
}
