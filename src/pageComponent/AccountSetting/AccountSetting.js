import { HeadingBox } from "@/component/Assets/Elements";
import { ErrorBox, SuccessBox } from "@/component/MessageBox/MessageBox";
import { Grid, Paper, TextField } from "@mui/material";
import styles from "../../pageComponent/AddPartner/addPartner.module.scss";
import { Fragment, useState } from "react";
import ModalGlobal from "@/component/ModalGlobal";
import ChangePassword from "./ChangePassword";
import AvatarImage from "@/component/UploadAvatar/AvatarImage";
import CroperImage from "@/component/UploadAvatar/CroperImage";
import ButtonGlobal from "@/component/ButtonGlobal";
import { updateUserDetailsAction } from "@/redux/action/updateUserDetailsAction";
import { uploadImageAction } from "@/redux/action/uploadImageAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import ForgotPassword from "../Forgotpassword/ForgotPassword";
import { getUserInfoAction } from "@/redux/action/getUserInfoAction";
import { isValidEmail } from "@/utils/validation";
import { USER_FULL_NAME, USER_PROFILE_PHOTO } from "@/redux/constants";
import { setCookie } from "@/utils/cookies";

const AccountSetting = () => {
  const dispatch = useDispatch();
  const { t: langTrans } = useTranslation();
  let hitLoginApi = false;

  const { userAccountDetails, updatedDetails, imageUploadData } = useSelector(
    (state) => {
      return {
        userAccountDetails: state?.userAttributeData?.userAttribute?.data,
        updatedDetails: state?.updatedDetails?.data,
        imageUploadData: state?.imageData?.imageData,
      };
    }
  );

  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [updateApiError, setUpdateApiError] = useState("");
  const [uploadImageApiError, setUploadImageApiError] = useState("");
  const [profileName, setProfileName] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  let formList = {
    first_name: "",
    last_name: "",
    email: "",
    login_id: "",
    user_id: "",
    profile_name: "",
  };
  const [formData, setFormData] = useState(formList);
  const convertBase64ToFile = () => {
    var block = croppedImage?.split(";");
    if (block) {
      var contentType = block[0].split(":")[1];
      var realData = block[1].split(",")[1];
      var bodyFormData = new FormData();
      bodyFormData.append("image", b64toBlob(realData, contentType));
      dispatch(uploadImageAction(bodyFormData));
    }
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  useEffect(() => {
    if (imageUploadData?.status == 200) {
      setSuccessMessage(imageUploadData?.detail?.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else if (
      imageUploadData?.status == 400 ||
      imageUploadData?.status == 404
    ) {
      setUploadImageApiError(imageUploadData?.message);
    }
  }, [imageUploadData]);

  useEffect(() => {
    if (updatedDetails?.status == 200) {
      setSuccessMessage(updatedDetails?.title);
      setProfileName(formData.first_name + " " + formData.last_name);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } else if (updatedDetails?.status == 400 || updatedDetails?.status == 404) {
      setUpdateApiError(updatedDetails?.message);
      setTimeout(() => {
        setUpdateApiError("");
      }, 3000);
    }
  }, [updatedDetails]);

  useEffect(() => {
    if (userAccountDetails?.FIRST_NAME) {
      let data = {
        first_name: userAccountDetails?.FIRST_NAME,
        last_name: userAccountDetails?.LAST_NAME,
        email: userAccountDetails?.EMAIL_ID,
        login_id: userAccountDetails?.LOGIN_ID,
        user_id: userAccountDetails?.USER_OID,
        profile_name: userAccountDetails?.PROFILE_NAME,
      };
      setProfileName(data.first_name + " " + data.last_name);
      setFormData(data);

      setCookie(
        USER_FULL_NAME,
        userAccountDetails?.FIRST_NAME + " " + userAccountDetails?.LAST_NAME,
        ""
      );
      setCookie(USER_PROFILE_PHOTO, userAccountDetails?.PROFILE_PHOTO, "");
    }
  }, [userAccountDetails]);

  useEffect(() => {
    if (croppedImage != "") convertBase64ToFile();
  }, [croppedImage]);

  useEffect(() => {
    if (!hitLoginApi) {
      hitLoginApi = true;
      dispatch(getUserInfoAction());
    }
  }, [dispatch]);

  const handleSave = (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      dispatch(updateUserDetailsAction(formData));
      setIsProcessing(false);
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.first_name) {
      errors.first_name = langTrans("Name is Required");
    }
    if (!formData.last_name) {
      errors.last_name = langTrans("Name is Required");
    }

    if (!formData.email) {
      errors.email = langTrans("Email is Required");
    } else if (!isValidEmail(formData.email)) {
      errors.email = langTrans("Please enter valid Email");
    }

    return errors;
  };

  const handleChange = (event) => {
    let { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    setErrors((prevError) => ({ ...prevError, [id]: undefined }));
  };
  return (
    <Fragment>
      <div className={`${styles.addPartner}`}>
        <HeadingBox title="Account Settings" />
        <Grid item xs={12}>
          <Paper className={styles.addParts} elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <h4>
                  My profile
                  <span>My classroom account information</span>
                </h4>
              </Grid>
              <Grid className={styles.addPartsList} item xs={8}>
                <AvatarImage
                  setIsActive={setIsActive}
                  setCroppedImage={setCroppedImage}
                  croppedImage={croppedImage}
                  setActiveFile={setSelectedFile}
                  profileName={profileName}
                  profilePicture={userAccountDetails?.PROFILE_PHOTO}
                  setSuccessMessage={setSuccessMessage}
                  setUploadImageApiError={setUploadImageApiError}
                />
                <SuccessBox title={successMessage} />
                {uploadImageApiError?.length > 0 && (
                  <ErrorBox title={uploadImageApiError} />
                )}
              </Grid>
            </Grid>
          </Paper>

          <Paper className={styles.addParts} elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <h4>
                  Basic details{" "}
                  <span>your basic account detail shows here</span>
                </h4>
              </Grid>
              <Grid className={styles.addPartsList} item xs={8}>
                <form onSubmit={handleSave}>
                  <ul>
                    <li>
                      <TextField
                        id="first_name"
                        label="First name"
                        name="name"
                        variant="filled"
                        fullWidth
                        className="customeFields"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                      <ErrorBox title={errors?.fullName} />
                    </li>
                    <li>
                      <TextField
                        id="last_name"
                        label="Last name"
                        name="name"
                        variant="filled"
                        fullWidth
                        className="customeFields"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                      <ErrorBox title={errors?.fullName} />
                    </li>

                    <li className={styles.positionDiv}>
                      <TextField
                        id="email"
                        label="Email"
                        name="email"
                        fullWidth
                        variant="filled"
                        type="email"
                        className="customeFields"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <ErrorBox title={errors?.email} />
                    </li>

                    {updateApiError?.length > 0 && (
                      <ErrorBox title={updateApiError} />
                    )}

                    <SuccessBox title={successMessage} />

                    <li>
                      <ButtonGlobal
                        type="submit"
                        width="auto"
                        disable={isProcessing}
                        title={isProcessing ? "Processing" : "Save Details"}
                      />
                    </li>
                  </ul>
                </form>
              </Grid>
            </Grid>
          </Paper>

          <Paper className={styles.addParts} elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <h4>
                  Security <span>You can change your password here</span>
                </h4>
              </Grid>
              <Grid className={styles.addPartsList} item xs={8}>
                <ul>
                  <li>
                    <ButtonGlobal
                      width="auto"
                      title="Change password"
                      onClick={() => setIsChangePassword(!isChangePassword)}
                    />
                  </li>
                </ul>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
      {isChangePassword && (
        <ModalGlobal
          activeState={isChangePassword}
          onClick={setIsChangePassword}
        >
          <ChangePassword
            setIsChangePassword={setIsChangePassword}
            email={formData.email}
            userId={formData.user_id}
            isForgotPwd={isForgotPassword}
            setIsForgotPassword={setIsForgotPassword}
          />
        </ModalGlobal>
      )}

      {isForgotPassword && (
        <ModalGlobal
          activeState={isForgotPassword}
          onClick={setIsForgotPassword}
        >
          <ForgotPassword
            className={styles.isforgot}
            hideLogo
            from="setting"
            setIsForgotPassword={setIsForgotPassword}
            userName={userAccountDetails?.username}
          />
        </ModalGlobal>
      )}

      {isActive && (
        <ModalGlobal
          onClick={setIsActive}
          activeState={selectedFile}
          heading="Edit photo"
        >
          <CroperImage
            setIsActive={setIsActive}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setCroppedImage={setCroppedImage}
          />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default AccountSetting;
