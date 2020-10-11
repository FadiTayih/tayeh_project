import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

const dropZoneStyles = {
  border: 'dashed 3px #eee',
  borderRadius: '5%',
  paddingTop: '30px',
  textAlign: 'center',
};

const dropZoneActive = {
  border: 'dashed 3px green',
};

export default function PhotoWidgetDropZone({ setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // to preview the image
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropZoneStyles, ...dropZoneActive } : dropZoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon size='huge' name='upload' />
      <Header content='Drop image here' />
    </div>
  );
}
