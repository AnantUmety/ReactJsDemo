import React, { useEffect, useState } from "react";
import styles from "./uploadAvatar.module.scss";
import uploadSimple from "../../../public/images/global/defaultUser.png";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeImageAction } from "@/redux/action/removeImageAction";

function AvatarImage({
  setActiveFile,
  croppedImage,
  setIsActive,
  setCroppedImage,
  profileName,
  profilePicture,
  setSuccessMessage,
  setUploadImageApiError
}) {

  const { removeImgData } = useSelector((state) => {
    return {
      removeImgData: state?.removeImageData?.data
    }
  })

  const dispatch = useDispatch();
  const [currentPic, setCurrentPic] = useState(null);

  const handleFileChange = (e) => {
    setIsActive(true);
    const file = e.target.files[0];
    setActiveFile(file);
  };

  const deleteImageHandler = () => {
    setActiveFile(null);
    setIsActive(false);
    setCroppedImage(null);
    setCurrentPic(null);
    dispatch(removeImageAction);
  };

  useEffect(() => {
    setCurrentPic(profilePicture);
  }, [profilePicture]);

  useEffect(() => {
    if (removeImgData?.status == 200) {
      setSuccessMessage(removeImgData?.message)
      // setActiveFile(null);
      // setIsActive(false);
      // setCroppedImage(null);
      // setCurrentPic(null);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else {
      setUploadImageApiError(removeImgData?.message);
      setTimeout(() => {
        setUploadImageApiError("")
      }, 3000);
    }
  }, [removeImgData]);

  return (
    <div className={`${styles.fileUploadCntr}`}>
      <div
        attr-data="usp"
        className={`${styles.uploadSmplDv} ${croppedImage && styles.uploadSmplDvAct
          }`}
      >
        {croppedImage || currentPic ? (
          <hgroup>
            <Image width={200} height={200} src={croppedImage || currentPic} alt="" />
          </hgroup>
        ) : (
          <hgroup>
            <Image width={200} height={200} src={uploadSimple} alt="" />
          </hgroup>
        )}

        <h1>{profileName}</h1>
      </div>

      <div className={styles.groupUpload}>
        <label className={styles.cstmFileUpload}>
          <input type="file" onChange={handleFileChange} />
          <span>Change avatar</span>
        </label>

        <button onClick={deleteImageHandler} className={styles.dtlBtn}>
          Remove avatar
        </button>
      </div>
      <h5>Allowed JPG, GIF or PNG. Max size of 800K</h5>
    </div>
  );
}

export default AvatarImage;
