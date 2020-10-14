import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FEEDS,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_PHOTO,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
} from './ProfileConst';

export function ListenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}

export function ListenToSelectedUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  };
}

export function ListenToUserPhotos(photo) {
  return {
    type: LISTEN_TO_USER_PHOTO,
    payload: photo,
  };
}

export function ListenToFollowers(followers) {
  return {
    type: LISTEN_TO_FOLLOWERS,
    payload: followers,
  };
}

export function ListenToFollowings(followings) {
  return {
    type: LISTEN_TO_FOLLOWINGS,
    payload: followings,
  };
}

export function setFollowUser() {
  return {
    type: SET_FOLLOW_USER,
  };
}

export function setUNFollowUser() {
  return {
    type: SET_UNFOLLOW_USER,
  };
}

export function listenToFeeds(feed) {
  return {
    type: LISTEN_TO_FEEDS,
    payload: feed,
  };
}
