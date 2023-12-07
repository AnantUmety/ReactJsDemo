import React, { useState } from "react";
import styles from "./upload.module.scss";
import uploadSimple from "../../../public/images/logistics/uploadSimple.png";
import Image from "next/image";
import { Button } from "@mui/material";
import ButtonGlobal from "@/component/ButtonGlobal";

function UploadImage({setActiveFile, activeFile, croppedImage, setIsActive, setCroppedImage, rounded, title}) {


  const handleFileChange = (e) => {
    setIsActive(true)
    const file = e.target.files[0];
    setActiveFile(file);
  };
  const deleteImageHandler=()=>{
    setActiveFile(null);
    setIsActive(false)
    setCroppedImage(null)
  }

  return (
    <div className={`${styles.fileUploadContainer}`}>
      <label className={styles.customFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <div attr-data="usp" className={`${styles.uploadSimpleDv} ${croppedImage && styles.uploadSimpleDvAct}`}>
          {croppedImage ? <Image width={100} height={90} src={croppedImage} alt="" /> : <Image src={uploadSimple} alt="" />  }
        </div>

        <aside>
          <span
          >
            {croppedImage ? "Change logo" : "Upload photo"}  
          </span>
          <h5>File type: JPG or PNG</h5>
        </aside>
      </label>
      {croppedImage && <ButtonGlobal onClick={deleteImageHandler} className={styles.deleteBtn} title="Delete" bgColor="gray" width="auto"></ButtonGlobal>}
    </div>
  );
}

export default UploadImage;
