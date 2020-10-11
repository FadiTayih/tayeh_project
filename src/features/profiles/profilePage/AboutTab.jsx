import React, { useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';
import { format } from 'date-fns';
import ProfileForm from './ProfileForm';
export default function Abouttab({ profile, isCurrentUser }) {
  const [editProfile, setEditProfile] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile.displayName}`}
          />

          {/* only display this if your checking others users profiles */}
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              onClick={() => setEditProfile(!editProfile)}
              content={editProfile ? 'Cancel' : 'Edit'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editProfile ? (
            <ProfileForm profile={profile} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <strong>
                  Member Since {format(profile.createdAt, 'dd MMM yyyy')}{' '}
                </strong>
                <div>{profile.description || null}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
