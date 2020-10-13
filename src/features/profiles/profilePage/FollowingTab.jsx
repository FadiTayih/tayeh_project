import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import {
  getFollowerColleciton,
  getFollowingsColleciton,
} from '../../../app/firebase/fireBaseService';
import useFireStoreCollection from '../../../app/hooks/useFireStoreCollections';
import { ListenToFollowers, ListenToFollowings } from '../ProfileActions';
import ProfileCard from './ProfileCard';

export default function Abouttab({ profile, activeTab }) {
  const dispatch = useDispatch();

  const { followers, followings } = useSelector((state) => state.profile);

  // custom hooks , based on which tab is active (followers/followings)
  useFireStoreCollection({
    query:
      activeTab === 2
        ? () => getFollowerColleciton(profile.id)
        : () => getFollowingsColleciton(profile.id),
    data: (data) =>
      activeTab === 2
        ? dispatch(ListenToFollowers(data))
        : dispatch(ListenToFollowings(data)),
    deps: [dispatch, activeTab],
  });
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={activeTab === 2 ? 'Followers' : 'Following'}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
            {activeTab === 2 &&
              followers.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
            {activeTab === 3 &&
              followings.map((profile) => (
                <ProfileCard profile={profile} key={profile.id} />
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
