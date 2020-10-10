import { LISTEN_TO_CURRENT_USER_PROFILE } from './ProfileConst';

const initalState = {
  currentUserProfile: null,
};

export default function ProfileReducer(state = initalState, { type, payload }) {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };
    default: {
      return state;
    }
  }
}
