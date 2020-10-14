import {
  CLEAR_FOLLOWINGS,
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FEEDS,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_PHOTO,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
} from './ProfileConst';

const initalState = {
  currentUserProfile: null,
  selectedUserPorfile: null,
  photos: [],
  profileOffer: [],
  followers: [],
  followings: [],
  followingUser: false,
  feeds: [],
};

export default function ProfileReducer(state = initalState, { type, payload }) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserPorfile: payload,
      };
    case LISTEN_TO_USER_PHOTO:
      return {
        ...state,
        photos: payload,
      };
    case LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: payload,
      };
    case LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: payload,
      };
    case SET_FOLLOW_USER:
      return {
        ...state,
        followingUser: true,
      };
    case SET_UNFOLLOW_USER:
      return {
        ...state,
        followingUser: false,
      };
    case CLEAR_FOLLOWINGS:
      return {
        ...state,
        followers: [],
        followings: [],
      };
    case LISTEN_TO_FEEDS:
      return {
        ...state,
        feeds: payload,
      };

    default: {
      return state;
    }
  }
}
