import {
  BackBtn,
  HeadingBox,
  SelectBoxHead,
  SelectNumber,
} from "@/component/Assets/Elements";

import { Grid, Paper, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../AddPartner/addPartner.module.scss";
import Image from "next/image";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import Select from "react-select";
import { customStyles } from "@/component/Assets/Elements";
import { RadioButton } from "@/component/Assets/Elements";
import ButtonGlobal from "@/component/ButtonGlobal";
import ModalGlobal from "@/component/ModalGlobal";
import UploadImage from "./UploadImage";
import CropImage from "./CropImage";
import uploadSimple from "../../../public/images/global/uploadSimple.png";
import fileArchive from "../../../public/images/global/fileArchive.png";
import closed from "../../../public/images/global/closed.png";
import { useSelector, useDispatch } from "react-redux";
import { countryListAction } from "@/redux/action/countryListAction";
import { districtListAction } from "@/redux/action/districtListAction";
import { getResellerByUserIdAction } from "@/redux/action/getResellerByUserIdAction";
import { addOrganizationAction } from "@/redux/action/addOrganizationAction";
import { uploadOrganizationDocAction } from "@/redux/action/uploadOrganizationDocAction";
import { isValidEmail, isValidName } from "@/utils/validation";
import Link from "next/link";
import pdfDoc from "../../../public/images/global/pdfDoc.svg";

const AddSchool = ({
  resellerId = "",
  title = "",
  type = "add",
  schoolUpdated,
  onBackPressed,
  schoolAgreement = null,
  formList = {
    firstName: "",
    lastName: "",
    schoolName: "",
    countryId: -1,
    email: "",
    phoneNo: "",
    orgAddress: "",
    districtId: -1,
    zipCode: "",
    billResellerId: "",
    isLogo: "0",
    resellerId: resellerId,
    // agreementDoc: "https://www.africau.edu/images/default/sample.pdf",
  },
}) => {
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [formData, setFormData] = useState(formList);
  const [countries, setCountries] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportcanAccessMine, setreportcanAccessMine] = useState([]);
  const [apiError, setApiError] = useState("");
  const [theme, setTheme] = useState({ one: true, two: false, three: false });

  const [logo, setLogo] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  let hitInitialApi = false;
  const dispatch = useDispatch();

  const { countryData, districtData, resellerByUserId, addedOrganization } =
    useSelector((state) => {
      return {
        countryData: state.globalData.globalData.countries,
        districtData: state.globalData.globalData.district,
        resellerByUserId: state?.resellerData?.resellerByUserId,
        addedOrganization: state?.organizationData?.addedOrganization,
      };
    });

  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  const simulateFileUpload = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 100) {
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 500);
  };

  useEffect(() => {
    if (selectedFile2) {
      simulateFileUpload();
    }
  }, [selectedFile2]);

  useEffect(() => {
    if (addedOrganization && addedOrganization?.status) {
      if (addedOrganization?.status == 200 && addedOrganization?.detail) {
        setIsProcessing(false);
        if (selectedFile2 || croppedImage) {
          var bodyFormData = new FormData();
          if (croppedImage) bodyFormData.append("file", logo);
          if (selectedFile2) bodyFormData.append("file", selectedFile2);
          bodyFormData.append("orgId", addedOrganization?.detail?.ORG_ID);
          dispatch(uploadOrganizationDocAction(bodyFormData));

          schoolUpdated(addedOrganization?.detail?.ORG_ID);
        } else {
          schoolUpdated(addedOrganization?.detail?.ORG_ID);
        }
      } else if (addedOrganization?.status == 400) {
        if (type == "add")
          formData.phoneNo = formData.phoneNo.substring(
            formData.phoneNo.length - 10,
            formData.phoneNo.length
          );
        else {
          formData.email = formList.email;
          formData.phoneNo = formList.phoneNo;
        }
        setApiError(addedOrganization?.message);
        setIsProcessing(false);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      } else {
        schoolUpdated();
      }
    }
  }, [addedOrganization]);

  const onChangeTheme = (e) => {
    const { name } = e.target;
    if (name === "one") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["isLogo"]: "0",
      }));
      setTheme({ ...theme, one: true, two: false, three: false });
    }
    if (name === "two") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["isLogo"]: "1",
      }));
      setTheme({ ...theme, one: false, two: true, three: false });
    }
    if (name === "three") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["isLogo"]: "2",
      }));
      setTheme({ ...theme, one: false, two: false, three: true });
    }
  };

  useEffect(() => {
    if (croppedImage?.length > 0) {
      convertBase64ToFile();
    }
  }, [croppedImage]);

  const handleChange = (event) => {
    let { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    setErrors((prevError) => ({ ...prevError, [id]: undefined }));
  };

  const closedHandler = () => {
    setSelectedFile2(null);
  };

  const convertBase64ToFile = () => {
    var block = croppedImage.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    setLogo(b64toBlob(realData, contentType));
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
    if (countryData && countryData.length > 0 && countries.length == 0) {
      setCountries([]);
      let countryList = [];
      countryData.map((item) => {
        let country = { value: item.id, label: item.name };
        if (formData?.countryName && item.name == formData?.countryName) {
          let data = formData;
          delete data.countryName;
          data.countryId = item.id;
          setFormData(data);
        }
        if (item.id == formData.countryId) {
          setCountryCode(item.code);
        }
        countryList.push(country);
      });
      setCountries(countryList);
    }
  }, [countryData]);

  useEffect(() => {
    if (districtData && districtData.length > 0 && districtList.length == 0) {
      setDistrictList([]);
      let districts = [];
      districtData.map((item) => {
        let district = { value: item.id, label: item.name };
        districts.push(district);
      });

      setDistrictList(districts);
    }
  }, [districtData]);

  useEffect(() => {
    if (dispatch && !hitInitialApi) {
      hitInitialApi = true;
      dispatch(countryListAction());
      dispatch(districtListAction());
      if (resellerId) {
        dispatch(getResellerByUserIdAction(resellerId));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (resellerByUserId && Object.keys(resellerByUserId)?.length > 0) {
      let data = [];
      data.push({
        value: resellerId,
        label:
          resellerByUserId.resellerFirstName +
          " " +
          resellerByUserId.resellerLastName,
      });
      resellerByUserId.reportWhoCanAccessMine?.map((item) => {
        data.push({
          value: item.oid,
          label: item.firstName + " " + item.lastName,
        });
      });
      setreportcanAccessMine(data);
    }
  }, [resellerByUserId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      setErrors({});

      if (formData.phoneNo.length == 10)
        formData.phoneNo = countryCode + formData.phoneNo;

      if (type == "update") {
        if (formList.email == formData.email) delete formData.email;
        if (
          formList.phoneNo ==
          formData.phoneNo.substring(
            formData.phoneNo.length - 10,
            formData.phoneNo.length
          )
        )
          delete formData.phoneNo;
        formData.orgName = formData.schoolName;
      }
      dispatch(addOrganizationAction(formData, type));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    let errorData = {};
    if (!formData.firstName) {
      errorData.firstName = "Please enter first name";
    } else if (!isValidName(formData.firstName)) {
      errorData.firstName = "Invalid first name";
    }
    if (!formData.lastName) {
      errorData.lastName = "Please enter last name";
    } else if (!isValidName(formData.lastName)) {
      errorData.lastName = "Invalid last name";
    }

    if (!formData.billResellerId && type != "update") {
      errorData.billReseller = "Please select biller";
    }
    if (!formData.schoolName) {
      errorData.schoolName = "Please enter school name";
    }
    if (formData.countryId == -1) {
      errorData.countryId = "Please select country";
    }
    if (!formData.email) {
      errorData.email = "Please enter email";
    } else if (!isValidEmail(formData.email)) {
      errorData.email = "Invalid email";
    }
    if (!formData.phoneNo) {
      errorData.phoneNo = "Please enter phone number";
    } else if (formData.phoneNo.replaceAll("0", " ").trim().length == 0) {
      errorData.phoneNo = "Invalid phone number";
    }
    if (!formData.orgAddress) {
      errorData.orgAddress = "Please enter address of the school";
    }
    if (formData.districtId == -1) {
      errorData.districtId = "Please select district";
    }
    if (!formData.zipCode) {
      errorData.zipCode = "Please enter zip code";
    }
    if (
      formData.isLogo == "2" &&
      (croppedImage == null || croppedImage == "")
    ) {
      errorData.logo = "Please upload logo";
    }
    return errorData;
  };

  const handleSelectChangeCountry = (obj) => {
    const { value } = obj;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["countryId"]: value,
    }));
    let country = countryData.find((item) => item.id == value);
    setCountryCode(country.code);
  };

  const handleSelectChangeBillId = (obj) => {
    const { value } = obj;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["billResellerId"]: value,
    }));
  };

  const handleSelectChangeDistrict = (obj) => {
    const { value } = obj;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["districtId"]: value,
    }));
  };

  return (
    <Fragment>
      <div className={styles.addPartner}>
        <BackBtn path="" onClicked={onBackPressed} />

        <>
          <HeadingBox title={title} />
          <Grid item xs={12}>
            {type == "add" && (
              <Paper className={styles.addParts} elevation={3}>
                <Grid container>
                  <Grid item xs={4}>
                    <h4>Shipping and billing detail </h4>
                  </Grid>
                  <Grid className={styles.addPartsList} item xs={8}>
                    <ul>
                      <h6 className={styles.addressDetail}>
                        {resellerByUserId?.firstName}{" "}
                        {resellerByUserId?.lastName}
                        <br /> {resellerByUserId?.resellerOrgName}
                        <br /> {resellerByUserId?.resellerAddress}
                        <br /> {resellerByUserId?.resellerCountryName},{" "}
                        {resellerByUserId?.resellerZipcode}
                      </h6>

                      <li>
                        <SelectBoxHead
                          title={formData?.billResellerId && "Bill to"}
                        >
                          <Select
                            options={reportcanAccessMine}
                            value={
                              formData?.billResellerId
                                ? {
                                    value: formData?.billResellerId,
                                    label: reportcanAccessMine.find(
                                      (data) =>
                                        data.value == formData?.billResellerId
                                    ).label,
                                  }
                                : null
                            }
                            onChange={handleSelectChangeBillId}
                            placeholder="Bill to"
                            className="customeSelects"
                            styles={customStyles}
                          />
                        </SelectBoxHead>
                        <ErrorBox title={errors.billReseller} />
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Paper>
            )}

            <Paper className={styles.addParts} elevation={3}>
              <Grid container>
                <Grid item xs={4}>
                  <h4>
                    School detail <span>School admin account details</span>
                  </h4>
                </Grid>
                <Grid className={styles.addPartsList} item xs={8}>
                  <section className={styles.radioButtons}>
                    <RadioButton
                      name="one"
                      id="one"
                      value="one"
                      label="Default logo"
                      onChange={onChangeTheme}
                      checked={theme.one}
                    />
                    <RadioButton
                      name="two"
                      id="two"
                      value="two"
                      label="No logo"
                      onChange={onChangeTheme}
                      checked={theme.two}
                    />
                    {/* <RadioButton
                    name="three"
                    id="three"
                    value="three"
                    label="Brand logo"
                    onChange={onChangeTheme}
                    checked={theme.three}
                  /> */}
                  </section>

                  {formData.isLogo == "2" ? (
                    <>
                      <UploadImage
                        setIsActive={setIsActive}
                        setCroppedImage={setCroppedImage}
                        croppedImage={croppedImage}
                        activeFile={selectedFile}
                        setActiveFile={setSelectedFile}
                      />
                      <ErrorBox title={errors.logo} />
                    </>
                  ) : null}

                  <ul className="halfBox">
                    <li>
                      <TextField
                        onChange={handleChange}
                        id="firstName"
                        value={formData.firstName}
                        label="First name"
                        variant="filled"
                        fullWidth
                        className="customeFields"
                      />
                      <ErrorBox title={errors.firstName} />
                    </li>
                    <li>
                      <TextField
                        onChange={handleChange}
                        id="lastName"
                        value={formData.lastName}
                        label="Last name"
                        fullWidth
                        variant="filled"
                        className="customeFields"
                      />
                      <ErrorBox title={errors.lastName} />
                    </li>
                    <li className="fullIn">
                      <TextField
                        onChange={handleChange}
                        id="schoolName"
                        value={formData.schoolName}
                        label="School name"
                        fullWidth
                        variant="filled"
                        className="customeFields"
                      />
                      <ErrorBox title={errors.schoolName} />
                    </li>
                    <li className="fullIn">
                      <SelectBoxHead
                        title={formData?.countryId != -1 && "Select country"}
                      >
                        <Select
                          id="countryId"
                          options={countries}
                          value={
                            formData?.countryId != -1
                              ? {
                                  value: formData.countryId,
                                  label: countries.find(
                                    (data) => data.value == formData?.countryId
                                  )?.label,
                                }
                              : null
                          }
                          onChange={handleSelectChangeCountry}
                          placeholder="Select country"
                          className="customeSelects"
                          styles={customStyles}
                        />
                      </SelectBoxHead>
                      <ErrorBox title={errors.countryId} />
                    </li>
                    <li className={`${styles.positionDiv} fullIn`}>
                      <h6>{countryCode}</h6>
                      <TextField
                        onChange={handleChange}
                        id="phoneNo"
                        value={formData.phoneNo}
                        label="Phone number"
                        variant="filled"
                        fullWidth
                        type="tel"
                        className="customeFieldsPassword"
                        onInput={(e) =>
                          (e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 10))
                        }
                      />
                      <ErrorBox title={errors.phoneNo} />
                    </li>
                    <li className="fullIn">
                      <TextField
                        onChange={handleChange}
                        id="email"
                        value={formData.email}
                        label="Email"
                        fullWidth
                        variant="filled"
                        type="email"
                        className="customeFields"
                      />
                      <ErrorBox title={errors.email} />
                    </li>

                    <li className="fullIn">
                      <TextField
                        onChange={handleChange}
                        id="orgAddress"
                        value={formData.orgAddress}
                        label="Address"
                        fullWidth
                        variant="filled"
                        className="customeFields"
                      />
                      <ErrorBox title={errors.orgAddress} />
                    </li>
                    <li className="fullIn">
                      <SelectBoxHead
                        title={formData?.districtId != -1 && "Select district"}
                      >
                        <Select
                          id="districtId"
                          options={districtList}
                          value={
                            formData.districtId != -1
                              ? {
                                  value: formData?.districtId,
                                  label: districtList?.find(
                                    (data) => data.value == formData?.districtId
                                  )?.label,
                                }
                              : null
                          }
                          onChange={handleSelectChangeDistrict}
                          placeholder="Select district"
                          className="customeSelects"
                          styles={customStyles}
                        />
                      </SelectBoxHead>
                      <ErrorBox title={errors.districtId} />
                    </li>
                    <li className="fullIn">
                      <TextField
                        onChange={handleChange}
                        id="zipCode"
                        value={formData.zipCode}
                        label="Zipcode"
                        fullWidth
                        variant="filled"
                        className="customeFields"
                        onInput={(e) =>
                          (e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 6))
                        }
                      />
                      <ErrorBox title={errors.zipCode} />
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Paper>

            <Paper className={styles.addParts} elevation={3}>
              <Grid container>
                <Grid item xs={4}></Grid>

                <Grid item xs={8} className={styles.supportedLists}>
                  <h4>Upload agreement document <span>your basic account detail shows here</span></h4>
                  {type == "update" &&
                    schoolAgreement != null &&
                    schoolAgreement != "" && (
                      <section>
                        <h4>Supported documents</h4>
                        <Link href={schoolAgreement} legacyBehavior>
                          <a
                            className={styles.pdfDownload}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={pdfDoc} width={32} height={32} alt="" />
                            <span>
                              <b>Uploaded by reseller</b>
                            </span>
                          </a>
                        </Link>
                      </section>
                    )}

                  <Grid className={styles.addPartsList} item xs={12}>
                    <div className={styles.fileUploadContainer}>
                      <label
                        className={styles.fileUploadLabel}
                        htmlFor="pdf-upload"
                      >
                        <Image src={uploadSimple} alt="" />
                        <p>
                          <b>Choose file</b> to upload{" "}
                          <span>File type: PDF</span>
                        </p>
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        id="pdf-upload"
                        className={styles.pdfUpload}
                        onChange={handleFileChange2}
                      />
                      {/* <button className={styles.uploadButton} onClick={handleUpload}>
                  Upload
                </button> */}
                    </div>
                    {selectedFile2 && (
                      <div className={styles.pdfbox}>
                        <h3>
                          <Image src={fileArchive} al="" />
                          {selectedFile2.name}
                        </h3>
                        <button onClick={() => closedHandler()}>
                          <Image src={closed} al="" />
                        </button>
                        <h6>
                          <b>{progress}%</b>
                          <span>
                            <em style={{ width: `${progress}%` }}></em>
                          </span>
                        </h6>
                      </div>
                    )}

                    <ErrorBox title={apiError} />
                    <ButtonGlobal
                      className={styles.saveClasses}
                      disable={isProcessing}
                      title={isProcessing ? "Processing" : "Save"}
                      width="auto"
                      onClick={handleSubmit}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      </div>

      {isActive && (
        <ModalGlobal
          onClick={setIsActive}
          activeState={selectedFile}
          heading="Edit photo"
        >
          <CropImage
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

export default AddSchool;
