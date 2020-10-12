import React from 'react';
import { Tab } from 'semantic-ui-react';
import Abouttab from './AboutTab';
import PhotoTab from './PhotoTab';

export default function ProfileContent({ profile, isCurrentUser }) {
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <Abouttab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'CarPhotos',
      render: () => (
        <PhotoTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    
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
