import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import ProfileContent from './ProfileContent';
import ProfileHeader from './ProfileHeader';
import useFireStoreDoc from '../../../app/hooks/useFireStoreDoc';
import { getUserProfile } from '../../../app/firebase/fireBaseService';
import { ListenToSelectedUserProfile } from '../ProfileActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ProfilePage({ match }) {
  const dispatch = useDispatch();
  const { selectedUserPorfile } = useSelector((state) => state.profile);

  // used to check if you are the current user on the profile page
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  // Custom hook to access fireStore
  useFireStoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(ListenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  // check props before loading the component (App  initializing)
  if ((loading && !selectedUserPorfile) || (!selectedUserPorfile && !error)) {
    return <LoadingComponent content='Loading Profile...' />;
  }

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserPorfile}
          isCurrentUser={currentUser.uid === selectedUserPorfile.id}
        />
        <ProfileContent
          profile={selectedUserPorfile}
          isCurrentUser={currentUser.uid === selectedUserPorfile.id}
        />
      </Grid.Column>
    </Grid>
  );
}
