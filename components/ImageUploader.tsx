/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

/**
 * Props for the ImageUploader component.
 * @property {(file: File) => void} onImageUpload - Callback function to be executed when an image is successfully uploaded.
 */
interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

/**
 * A component that provides a drag-and-drop zone for uploading images.
 * It uses the 'react-dropzone' library to handle file drops.
 * This component is currently a placeholder.
 *
 * @param {ImageUploaderProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered dropzone element.
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`uploader-placeholder ${isDragActive ? 'active' : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageUploader;
