import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromFireStore } from '../firebase/fireBaseService';
import {
  aysncActionStart,
  aysncActionFinish,
  aysncActionError,
} from '../async/asyncReducer';

// getting colelction from fireStore
export default function useFireStoreDoc({ query, data, deps }) {
  const dispatch = useDispatch();

  // Component mount
  useEffect(() => {
    // Start the loading indicator
    dispatch(aysncActionStart());

    const unsubscribe = query().onSnapshot(
      (snapShot) => {
        // If the id of the offer is wrong
        if (!snapShot.exists) {
          dispatch(
            aysncActionError({
              code: 'not-found',
              message: 'Could not find document',
            })
          );
          return;
        }
        data(dataFromFireStore(snapShot));
        dispatch(aysncActionFinish());
      },
      (error) => dispatch(aysncActionError(error))
    );

    // unmount
    return () => {
      unsubscribe();
    };
  }, deps); //eslint-disable-line react-hooks/exhaustive-deps
}
