import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react';
import {
  followUser,
  getFollowingDoc,
  unFollowUser,
} from '../../../app/firebase/fireBaseService';
import { setFollowUser, setUNFollowUser } from '../ProfileActions';
import { CLEAR_FOLLOWINGS } from '../ProfileConst';

export default function ProfileHeader({ profile, isCurrentUser }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // check the following status of the user
  const { followingUser } = useSelector((state) => state.profile);

  // check the status (following or not)
  useEffect(() => {
    if (isCurrentUser) return;

    setLoading(true);

    async function fetchFollowingDoc() {
      try {
        const followingDoc = await getFollowingDoc(profile.id);
        if (followingDoc && followingDoc.exists) {
          dispatch(setFollowUser());
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    fetchFollowingDoc().then(() => setLoading(false));

    return () => {
      dispatch({ type: CLEAR_FOLLOWINGS });
    };
  }, [dispatch, profile.id, isCurrentUser]);

  // handle the following of user
  async function handleFollowUser() {
    setLoading(true);

    try {
      await followUser(profile);
      dispatch(setFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // handle the unfollowing of user
  async function handleUnFollowUser() {
    setLoading(true);

    try {
      await unFollowUser(profile);
      dispatch(setUNFollowUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || '/assests/images/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile.displayName}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group>
            <Statistic label='Followers' value={profile.followerCount || 0} />
            <Statistic label='Following' value={profile.followingCount || 0} />
          </Statistic.Group>
          {/* only display this if your checking others users profiles */}
          {!isCurrentUser && (
            <>
              <Divider />
              <Reveal animated='move'>
                <Reveal.Content visible style={{ width: '100%' }}>
                  <Button
                    fluid
                    color='teal'
                    content={followingUser ? 'Following' : 'Not Following'}
                  />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                  {/* If your not following the user, then give the option to follow the user */}
                  <Button
                    fluid
                    onClick={
                      followingUser
                        ? () => handleUnFollowUser()
                        : () => handleFollowUser()
                    }
                    loading={loading}
                    color={followingUser ? 'red' : 'green'}
                    content={followingUser ? 'unFollow' : 'Follow'}
                  />
                </Reveal.Content>
              </Reveal>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
