import cuid from 'cuid';
import React, { useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { getFileExtension } from '../util/util';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { uploadToFireBaseStorage } from '../../firebase/fireStoreService';
import PhotoWidgetDropZone from './PhotoWidgetDropZone';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../firebase/fireBaseService';

export default function PhotoUploadWidget({ setEditMode }) {
  // used for the dropZone and preview
  const [files, setFiles] = useState([]);

  // used for cropping the image and upload
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // handle uploading the image
  function handleUploadImage() {
    setLoading(true);
    // create a unqiue image name for firebase
    const fileName = cuid() + '.' + getFileExtension(files[0].name);
    const uploadTask = uploadToFireBaseStorage(image, fileName);

    // progress bar
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '%done');
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, fileName)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setImage(null);
    setFiles([]);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo' />
        <PhotoWidgetDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={6}>
        <Header sub color='teal' content='Step 2 - Resize' />

        {/* Check if a image exist before cropping */}
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={6}>
        <Header sub color='teal' content='Step 3 - Preview & Upload' />
        {/* Check if a image exist before previewing */}
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon='check'
              />
              <Button
                disabled={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon='close'
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
}
