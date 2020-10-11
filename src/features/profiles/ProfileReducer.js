import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
} from './ProfileConst';

const initalState = {
  currentUserProfile: null,
  selectedUserPorfile: null,
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
    default: {
      return state;
    }
  }
}
