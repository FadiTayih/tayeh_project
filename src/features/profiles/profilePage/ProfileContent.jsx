import React from 'react';
import { Tab } from 'semantic-ui-react';
import Abouttab from './AboutTab';

export default function ProfileContent({ profile }) {
  const panes = [
    { menuItem: 'About', render: () => <Abouttab profile={profile} /> },
    { menuItem: 'CarPhotos', render: () => <Tab.Pane>Car Photos</Tab.Pane> },
    { menuItem: 'Offers', render: () => <Tab.Pane>Offers</Tab.Pane> },
    { menuItem: 'Interest', render: () => <Tab.Pane>Interest</Tab.Pane> },
    { menuItem: 'Interested', render: () => <Tab.Pane>Interested</Tab.Pane> },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
}
