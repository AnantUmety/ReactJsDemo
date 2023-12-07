
import React, { useRef, useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // Import the CSS for styling
import ButtonGlobal from '@/component/ButtonGlobal';
import styles from "./uploadAvatar.module.scss";

function CroperImage({ selectedFile, setCroppedImage, setSelectedFile, setIsActive }) {
  const [src, setSrc] = useState(null);
  const cropperRef = useRef(null);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageBase64 = event.target.result;
        setSrc(imageBase64); // Set the image source
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const handleCrop = () => {
    if (cropperRef && cropperRef.current) {
      const croppedImageDataUrl = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCroppedImage(croppedImageDataUrl);
    }
    setSelectedFile(null)
    setIsActive(false)
  };

  return (
    <div className={styles.cropImageDiv}>
      {src && (
        <>
          <Cropper
            ref={cropperRef}
            src={src} // Set the image source from props
            style={{ height: 400, width: '100%' }}
            // Add any additional Cropper.js options here
          />
          <ButtonGlobal className={styles.uploadPhoto} title="Upload photo" onClick={handleCrop} width='auto' />
        </>
      )}
      {/* {croppedImage && (
        <div>
          <h2>Cropped Image:</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )} */}
    </div>
  );
}

export default CroperImage;
