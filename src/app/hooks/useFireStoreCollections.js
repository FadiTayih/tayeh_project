import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromFireStore } from '../firebase/fireBaseService';
import {
  aysncActionStart,
  aysncActionFinish,
  aysncActionError,
} from '../async/asyncReducer';

// getting colelction from fireStore
export default function useFireStoreCollection({ query, data, deps }) {
  const dispatch = useDispatch();

  // Component mount
  useEffect(() => {
    // Start the loading indicator
    dispatch(aysncActionStart());

    const unsubscribe = query().onSnapshot(
      (snapShot) => {
        const docs = snapShot.docs.map((doc) => dataFromFireStore(doc));
        data(docs);
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
