import React from 'react';
import { Tab } from 'semantic-ui-react';
import Abouttab from './AboutTab';
import PhotoTab from './PhotoTab';
import FollowingTab from './FollowingTab';
import { useState } from 'react';

export default function ProfileContent({ profile, isCurrentUser }) {
  // manage which tab is open (Followers/Followings)
  const [activeTab, setActiveTab] = useState(0);
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

    {
      menuItem: 'Followers',
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: 'Followings',
      render: () => (
        <FollowingTab
          profile={profile}
          key={profile.id}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
