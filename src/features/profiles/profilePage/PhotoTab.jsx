import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import {
  deletePhotoFromColleciton,
  getUserPhotos,
  setMainPhoto,
} from '../../../app/firebase/fireBaseService';
import { deletePhotoFormFireBaseStorge } from '../../../app/firebase/fireStoreService';
import useFireStoreCollections from '../../../app/hooks/useFireStoreCollections';
import { ListenToUserPhotos } from '../ProfileActions';

export default function Abouttab({ profile, isCurrentUser }) {
  // toggle the edit mode
  const [editProfile, setEditProfile] = useState(false);

  // used as a loading indicator when updating the user photo
  const [updating, setUpdateing] = useState({
    isUpdating: false,
    target: null,
  });

  // used as a laoding indicator when deleteing the photos
  const [deleting, setDeleteing] = useState({
    isDeleting: false,
    target: null,
  });

  const { loading } = useSelector((state) => state.async);
  const { photos } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // custom hook to get the collection
  useFireStoreCollections({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(ListenToUserPhotos(photos)),
    deps: [dispatch, profile.id],
  });

  // set the main photo of the user
  async function handleSetMainPhoto(photo, target) {
    setUpdateing({ isUpdating: true, target });

    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdateing({ isUpdating: true, target: null });
    }
  }

  //  delete the user photo
  async function handleDeletePhoto(photo, target) {
    setDeleteing({ isDeleting: true, target });

    try {
      await deletePhotoFormFireBaseStorge(photo.name);
      await deletePhotoFromColleciton(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleteing({ isDeleting: true, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content={`Photos`} />

          {/* only display this if your checking others users profiles */}
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              onClick={() => setEditProfile(!editProfile)}
              content={editProfile ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16  }>
          {editProfile ? (
            <PhotoUploadWidget setEditMode={setEditProfile} />
          ) : (
            <Card.Group itemsPerRow={3}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      basic
                      color='green'
                      content='main'
                    />
                    <Button
                      name={photo.id}
                      onClick={(e) => handleDeletePhoto(photo, e.target.name)}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      basic
                      color='red'
                      icon='trash'
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
