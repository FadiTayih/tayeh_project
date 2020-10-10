import { LISTEN_TO_CURRENT_USER_PROFILE } from './ProfileConst';

export function ListenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  };
}
