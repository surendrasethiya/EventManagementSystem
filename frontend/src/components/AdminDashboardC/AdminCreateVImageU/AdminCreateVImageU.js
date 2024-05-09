import React, { useState } from 'react';
import styles from './AdminCreateVImageU.module.css';

export default function AdminCreateVImageU({selectedImages,setSelectedImages,uploadError}) {
  
  const imageHandleChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      Promise.all(
        fileArray.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve(event.target.result);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(file);
          });
        })
      ).then((base64Array) => {
        setSelectedImages(base64Array);
        // handleUploadOneByOne(base64Array);
      });
    }
  };


  // const handleUploadOneByOne = async (images) => {
  //   try {
  //     for (let i = 0; i < images.length; i++) {
  //       const formData = new FormData();
  //       formData.append('image', images[i]);

  //       const response = await fetch('YOUR_BACKEND_API_ENDPOINT', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Image upload failed. `);
  //       }

  //       const data = await response.json();
  //       console.log(`Image uploaded successfully. Backend response:`, data);

  //       // Add any confirmation logic here
  //     }

  //     console.log('All images uploaded.');
  //   } catch (error) {
  //     console.error('Error uploading images to the backend:', error);
  //     setUploadError(error.message);
  //   }
  // };


  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return <img src={photo} key={index} alt={`venue-${index}`} />;
    });
  };


  return (
    <>
      <div className={styles.imageUploaderWrapper}>
        <input
          type="file"
          name=""
          id="uploadBtn"
          multiple
          accept="image/*"
          onChange={imageHandleChange}
          
        />
        <label htmlFor="uploadBtn">
          <span>⬆️</span>Upload Photos
        </label>
      </div>

      {uploadError && <p>Error uploading images: {uploadError}</p>}

      <div className={styles.uploadImageWrapper}>{renderPhotos(selectedImages)}</div>
    </>
  );
}
