import {
  BackBtn,
  DatePickers,
  HeadingBox,
  SelectBoxHead,
} from "@/component/Assets/Elements";

import { Grid, Paper, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../AddPartner/addPartner.module.scss";
import stylesSD from "../SchoolDetails/schoolDeatil.module.scss";
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
import { uploadOrganizationDocAction } from "@/redux/action/uploadOrganizationDocAction";
import { isValidEmail, isValidName } from "@/utils/validation";
import Link from "next/link";
import pdfDoc from "../../../public/images/global/pdfDoc.svg";
import { getSkuDescriptionAction } from "@/redux/action/getSkuDescriptionAction";
import { getSkuListAction } from "@/redux/action/getSkuListAction";
import { createOrderAction } from "@/redux/action/createOrderAction";
import moment from "moment";
import { getOrganiztionByResellerIdAction } from "@/redux/action/getOrganiztionByResellerIdAction";
import { getLicenseByOrgIdAction } from "@/redux/action/getLicenseByOrgIdAction";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Table from "@/component/Table";
import { RESET_SKU_DESCRIPTION } from "@/redux/constants";

const CreateOrder = ({
  resellerId = "",
  title = "",
  type = "add",
  orderUpdated,
  onBackPressed,
  schoolAgreement = null,
  formList = {
    resellerId: "",
    newSchool: true,
    firstName: "",
    lastName: "",
    orgName: "",
    email: "",
    orgAddress: "",
    countryId: -1,
    zipCode: "",
    phoneNo: "",
    skuId: -1,
    licenseFrom: null,
    noOfStudent: "",
    isLogo: "0",
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
  const [schoolLising, setSchoolLising] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportcanAccessMine, setreportcanAccessMine] = useState([]);
  const [apiError, setApiError] = useState("");
  const [theme, setTheme] = useState({
    one: true,
    two: false,
    three: false,
    isNewSchool: true,
    isExistingSchool: false,
    isNewLicense: false,
    isRenewLicense: false,
  });
  const [licenseTill, setLicenseTill] = useState(null);
  const [renewalLicenseTill, setRenewalLicenseTilll] = useState(null);

  const [skuList, setSkuList] = useState([]);
  const [skuData, setSkuData] = useState({});

  const [isAccord, setIsAccord] = useState(false);
  const [isAccordOpen, setIsAccordOpen] = useState(false);
  const [logo, setLogo] = useState(null);

  const [isNewSchool, setIsNewSchool] = useState(true);
  const [isNewLicense, setIsNewLicense] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState(-1);
  const [countryCode, setCountryCode] = useState("");
  const [licenseData, setLicenseData] = useState([]);
  const [isRenewLicense, setIsRenewLicense] = useState(false);
  const [renewLicenseFrom, setRenewLicenseFrom] = useState(null);
  const [renewalSkuId, setRenewwalSkuId] = useState(-1);
  const [renewalNoOfStudents, setRenewalNoOfStudents] = useState(null);
  let hitInitialApi = false;
  const dispatch = useDispatch();

  const {
    countryData,
    districtData,
    resellerByUserId,
    createOrder,
    skuListing,
    skuDetail,
    schoolListByReseller,
    licenseDetail,
  } = useSelector((state) => {
    return {
      countryData: state.globalData.globalData.countries,
      districtData: state.globalData.globalData.district,
      resellerByUserId: state?.resellerData?.resellerByUserId,
      skuListing: state?.sku?.skuListing,
      skuDetail: state?.sku?.skuDetail,
      createOrder: state?.orderData?.createOrder,
      schoolListByReseller:
        state?.organizationData?.organizationByResellerId?.rows,
      licenseDetail: state?.organizationData?.schoolLicense?.rows,
    };
  });

  const handleFileChange2 = (e) => {
    setSelectedFile2(e.target.files[0]);
  };

  useEffect(() => {
    if (licenseDetail?.length > 0 && licenseData?.length == 0) {
      setLicenseData(licenseDetail);
    }
  }, [licenseDetail]);

  useEffect(() => {
    if (
      schoolListByReseller &&
      schoolListByReseller.length > 0 &&
      schoolLising.length == 0
    ) {
      let school = [];
      schoolListByReseller.map((item) => {
        let sku = { value: item.orgId, label: item.orgName };
        school.push(sku);
      });
      setSchoolLising(school);
    }
  }, [schoolListByReseller]);

  console.log(schoolListByReseller);
  useEffect(() => {
    if (skuListing && skuListing.length > 0 && skuList.length == 0) {
      let skus = [];
      skuListing.map((item) => {
        let sku = { value: item.id, label: item.name };
        skus.push(sku);
      });
      setSkuList(skus);
    }
  }, [skuListing]);

  useEffect(() => {
    if (skuDetail?.id) {
      setSkuData(skuDetail);
      checkForLicenseTo(formData?.licenseFrom);
    }
  }, [skuDetail]);

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
    if (createOrder && createOrder?.status) {
      if (createOrder?.status == 200 && createOrder?.detail) {
        setIsProcessing(false);
        if (selectedFile2 || croppedImage) {
          var bodyFormData = new FormData();
          if (croppedImage) bodyFormData.append("file", logo);
          if (selectedFile2) bodyFormData.append("file", selectedFile2);
          bodyFormData.append("orgOrderId", createOrder?.detail?.ORG_ORDER_ID);
          dispatch(uploadOrganizationDocAction(bodyFormData));

          orderUpdated();
        } else {
          orderUpdated();
        }
      } else if (createOrder?.status == 400) {
        if (type == "add")
          formData.phoneNo = formData.phoneNo.substring(
            formData.phoneNo.length - 10,
            formData.phoneNo.length
          );
        else {
          formData.email = formList.email;
          formData.phoneNo = formList.phoneNo;
        }
        setApiError(createOrder?.message);
        setIsProcessing(false);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      } else {
        orderUpdated();
      }
    }
  }, [createOrder]);

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
      dispatch(getSkuListAction());

      if (resellerId) {
        dispatch(getResellerByUserIdAction(resellerId));
        dispatch(getOrganiztionByResellerIdAction(resellerId));
      }
    }
  }, [dispatch]);

  const handleSelectChangeSku = (obj) => {
    const { value } = obj;
    dispatch(getSkuDescriptionAction(value));
    setSkuData({});

    setFormData((prevFormData) => ({
      ...prevFormData,
      ["skuId"]: value,
    }));
    checkForLicenseTo(formData?.licenseFrom);
  };

  const checkForLicenseTo = (date) => {
    if (date && formData.skuId != -1) {
      let dd = new Date(date);
      dd.setDate(dd.getDate() + skuDetail?.validity);
      setLicenseTill(moment(dd).format("MM/DD/YYYY"));
    }
  };
  const checkForRenewalLicenseTo = (date) => {
    if (date && renewalSkuId != -1) {
      let dd = new Date(date);
      dd.setDate(dd.getDate() + 30);
      setRenewalLicenseTilll(moment(dd).format("MM/DD/YYYY"));
    }
  };

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

  const validateNewLicenseForm = () => {
    let errorData = {};
    if (formData.skuId == -1) {
      errorData.skuId = "Please select SKU";
    }
    if (!formData.licenseFrom) {
      errorData.licenseFrom = "Please select SKU license start date";
    }
    if (formData.noOfStudent == "") {
      errorData.noOfStudent = "Please enter number of students";
    }
    return errorData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isNewSchool && isNewLicense) {
      let apiData = {
        resellerId: resellerId,
        newSchool: false,
        skuId: formData.skuId,
        licenseFrom: formData.licenseFrom,
        noOfStudent: formData.noOfStudent,
        isRenewal: "N",
        existingOrgId: selectedSchool,
      };
      const validationErrors = validateNewLicenseForm();
      if (Object.keys(validationErrors).length === 0) {
        setIsProcessing(true);
        setErrors({});
        dispatch(createOrderAction(apiData));
      } else {
        setErrors(validationErrors);
      }
    } else {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length === 0) {
        setIsProcessing(true);
        setErrors({});

        if (formData.phoneNo.length == 10)
          formData.phoneNo = countryCode + formData.phoneNo;
        formData.existingOrgId = "0";
        dispatch(createOrderAction(formData));
      } else {
        setErrors(validationErrors);
      }
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

    if (!formData.resellerId) {
      errorData.resellerId = "Please select biller";
    }
    if (!formData.orgName) {
      errorData.orgName = "Please enter school name";
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
    if (formData.noOfStudent == "") {
      errorData.noOfStudent = "Please enter number of students";
    }
    if (!formData.zipCode) {
      errorData.zipCode = "Please enter zip code";
    }
    if (formData.skuId == -1) {
      errorData.skuId = "Please select SKU";
    }
    if (!formData.licenseFrom) {
      errorData.licenseFrom = "Please select SKU license start date";
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
      ["resellerId"]: value,
    }));
  };

  const expiresOnHandler = (data, v) => {
    let status = "N";

    if (data?.licenceTo) {
      var date = moment(data?.licenceTo);
      var now = moment();

      if (now > date) {
        status = "E";
      } else {
        status = "A";
      }
    }

    return (
      <p
        className={
          status == "N"
            ? styles.colors2
            : status == "E"
            ? styles.colors1
            : styles.colors
        }
      >
        {status == "N"
          ? "--"
          : status == "E"
          ? "Expired"
          : moment(data?.licenceTo).format("Do MMMM  YYYY")}
      </p>
    );
  };

  const handleRenewSubmit = () => {
    const apiData = {
      resellerId: resellerId,
      newSchool: false,
      skuId: renewalSkuId,
      licenseFrom: renewLicenseFrom,
      noOfStudent: renewalNoOfStudents,
      isRenewal: "Y",
      renewalSkuId: renewalSkuId,
      existingOrgId: selectedSchool,
    };

    setRenewLicenseFrom(null);
    setRenewalLicenseTilll(null);
    setRenewalNoOfStudents(null);
    dispatch(createOrderAction(apiData));
  };

  const licenseFromHandler = (data) => {
    return <p>{moment(data?.licenceFrom).format("Do MMMM  YYYY")}</p>;
  };

  const licenseDetailView = (row) => {
    return (
      <Fragment>
        <button
          onClick={() => licenseHandler(row.skuId, row.licenceFrom)}
          className={stylesSD.addedit}
        >
          {row.skuId + row.licenceFrom == isAccordOpen ? (
            <HiMinusSm />
          ) : (
            <HiPlusSm />
          )}
        </button>
        {row.skuId + row.licenceFrom == isAccordOpen && skuData?.desc && (
          <LicenseDataList licenceFrom={row.licenceFrom} />
        )}
      </Fragment>
    );
  };

  const licenseColumns = [
    {
      Header: "License",
      accessor: "skuName",
      canSort: true,
    },
    {
      Header: "Device Counts",
      accessor: "noOfDevice",
      canSort: true,
    },
    {
      Header: "Start Date",
      accessor: licenseFromHandler,
      canSort: true,
    },
    {
      Header: "Expire on",
      accessor: expiresOnHandler,
      canSort: true,
    },
    {
      Header: "Action",
      accessor: licenseDetailView,
      arrow: true,
    },
  ];

  const licenseHandler = (id, licenceFrom) => {
    setIsAccord(!isAccord);
    if (isAccordOpen === id + licenceFrom) {
      setSkuData({});
      return setIsAccordOpen(null);
    } else {
      dispatch(getSkuDescriptionAction(id));
      setIsAccordOpen(id + licenceFrom);
      // setRenewLicenseFrom(null);
      // setRenewalLicenseTilll(null);
      // setRenewalNoOfStudents(null);

      // setRenewwalSkuId(id);
      // setIsRenewLicense(true);
    }
  };
  const LicenseDataList = ({ licenceFrom }) => {
    let status = "N";

    if (licenceFrom) {
      var date = moment(licenceFrom);
      var now = moment();

      if (now > date) {
        status = "E";
      } else {
        status = "A";
      }
    }

    return (
      <section className={styles.platformCntr}>
        <h4>{skuData?.desc}</h4>
        <ul>
          <li>
            <b>Curriculum Name </b>
            {skuData?.curriculumName}
          </li>

          <li>
            <b>No. of devices</b>
            {skuData?.noOdDevice}
          </li>
          <li>
            <b>Validity (in days)</b>
            {skuData?.validity}
          </li>
          <li>
            <b>Professional Development</b>
            {skuData?.isPd == "Y" ? "Yes" : "No"}
          </li>
        </ul>

        <ul>
          <li>
            <b>Self Study </b>
            <span>{skuData?.isSelfStudy == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>SignUp</b>
            <span>{skuData?.isSignUp == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>VR Lab</b>
            <span>{skuData?.isVrLab == "Y" ? "Yes" : "No"}</span>
          </li>
        </ul>
        {status == "E" && (
          <ButtonGlobal
            width="auto"
            title="Renew License"
            onClick={() => {
              setRenewwalSkuId(skuData.id);
              setRenewLicenseFrom(null);
              setRenewalLicenseTilll(null);
              setRenewalNoOfStudents(null);

              setIsRenewLicense(true);
            }}
          />
        )}
      </section>
    );
  };

  return (
    <Fragment>
      <div className={styles.addPartner}>
        <BackBtn path="" onClicked={onBackPressed} />
        <>
          <HeadingBox title={title} />
          <Grid item xs={12}>
            <Paper className={styles.addParts} elevation={3}>
              <Grid container>
                <Grid item xs={4}>
                  <h4>School </h4>
                </Grid>
                <Grid className={styles.addPartsList} item xs={8}>
                  <section className={styles.radioButtons}>
                    <RadioButton
                      name="isNewSchool"
                      id="isNewSchool"
                      value="isNewSchool"
                      label="New School"
                      onChange={() => {
                        dispatch({ type: RESET_SKU_DESCRIPTION });
                        setSkuData({});
                        setFormData(formList);
                        setSelectedSchool(-1);
                        setIsNewSchool(true);
                        setErrors({});
                        setTheme({
                          ...theme,
                          isNewSchool: true,
                          isExistingSchool: false,
                          isNewLicense: false,
                          isRenewLicense: false,
                        });
                      }}
                      checked={theme.isNewSchool}
                    />
                    <RadioButton
                      name="isExistingSchool"
                      id="isExistingSchool"
                      value="isExistingSchool"
                      label="Existing school"
                      onChange={() => {
                        setSkuData({});
                        dispatch({ type: RESET_SKU_DESCRIPTION });
                        setFormData(formList);
                        setErrors({});
                        setSelectedSchool(-1);
                        setIsNewSchool(false);
                        setIsNewLicense(true);
                        setTheme({
                          ...theme,
                          isNewSchool: false,
                          isExistingSchool: true,
                          isNewLicense: true,
                          isRenewLicense: false,
                        });
                      }}
                      checked={theme.isExistingSchool}
                    />
                  </section>
                  {!isNewSchool && (
                    <>
                      <section className={styles.selectSchoolBox}>
                        <SelectBoxHead
                          title={formData?.countryId != -1 && "Select country"}
                        >
                          <Select
                            id="school"
                            options={schoolLising}
                            value={
                              selectedSchool != -1
                                ? {
                                    value: selectedSchool,
                                    label: schoolLising.find(
                                      (data) => data.value == selectedSchool
                                    )?.label,
                                  }
                                : null
                            }
                            onChange={(obj) => {
                              const { value } = obj;
                              setSelectedSchool(value);
                              setFormData(formList);
                            }}
                            placeholder="Select school"
                            className="customeSelects"
                            styles={customStyles}
                          />
                        </SelectBoxHead>
                        <ErrorBox title={errors.countryId} />
                      </section>{" "}
                      {selectedSchool != -1 && (
                        <section className={styles.radioButtons}>
                          <RadioButton
                            name="isNewLicense"
                            id="isNewLicense"
                            value="isNewLicense"
                            label="New License"
                            onChange={() => {
                              setSkuData({});
                              dispatch({ type: RESET_SKU_DESCRIPTION });
                              setFormData(formList);
                              setErrors({});
                              setIsNewLicense(true);
                              setTheme({
                                ...theme,
                                isNewLicense: true,
                                isRenewLicense: false,
                              });
                            }}
                            checked={theme.isNewLicense}
                          />
                          <RadioButton
                            name="isRenewLicense"
                            id="isRenewLicense"
                            value="isRenewLicense"
                            label="Renew License"
                            onChange={() => {
                              setSkuData({});
                              dispatch({ type: RESET_SKU_DESCRIPTION });
                              setFormData(formList);
                              setErrors({});
                              setIsNewLicense(false);
                              setTheme({
                                ...theme,
                                isNewLicense: false,
                                isRenewLicense: true,
                              });
                              dispatch(getLicenseByOrgIdAction(selectedSchool));
                            }}
                            checked={theme.isRenewLicense}
                          />
                        </section>
                      )}
                    </>
                  )}
                  {!isNewSchool &&
                    !isNewLicense &&
                    selectedSchool != -1 &&
                    licenseData.length > 0 && (
                      <Table
                        className={stylesSD.customeTableDetails}
                        data={licenseData}
                        limit={20}
                        columns={licenseColumns}
                        search
                      />
                    )}

                  {!isNewSchool &&
                    !isNewLicense &&
                    selectedSchool != -1 &&
                    licenseData.length == 0 && (
                      <h3>
                        No license available for this school . <span></span>
                      </h3>
                    )}
                </Grid>
              </Grid>
            </Paper>

            {type == "add" && isNewSchool && (
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
                          title={formData?.resellerId && "Bill to"}
                        >
                          <Select
                            options={reportcanAccessMine}
                            value={
                              formData?.resellerId
                                ? {
                                    value: formData?.resellerId,
                                    label: reportcanAccessMine.find(
                                      (data) =>
                                        data.value == formData?.resellerId
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
                        <ErrorBox title={errors.resellerId} />
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {isNewSchool && (
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
                      <RadioButton
                        name="three"
                        id="three"
                        value="three"
                        label="Brand logo"
                        onChange={onChangeTheme}
                        checked={theme.three}
                      />
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
                          id="orgName"
                          value={formData.orgName}
                          label="School name"
                          fullWidth
                          variant="filled"
                          className="customeFields"
                        />
                        <ErrorBox title={errors.orgName} />
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
                                      (data) =>
                                        data.value == formData?.countryId
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
                      {/* <li className="fullIn">
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
                    </li> */}
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
            )}
            {(isNewSchool || (isNewLicense && selectedSchool != -1)) && (
              <Paper className={styles.addParts} elevation={3}>
                <Grid container>
                  <Grid item xs={4}>
                    <h4>SKU Detail</h4>
                  </Grid>
                  <Grid className={styles.addPartsList} item xs={8}>
                    <ul className="halfBox">
                      <li className="fullIn">
                        <SelectBoxHead
                          title={formData.skuId != -1 && "Select SKU"}
                        >
                          <Select
                            value={
                              formData.skuId != -1
                                ? {
                                    value: formData?.skuId,
                                    label: skuList?.find(
                                      (data) => data.value == formData?.skuId
                                    )?.label,
                                  }
                                : null
                            }
                            onChange={handleSelectChangeSku}
                            options={skuList}
                            placeholder="Select SKU"
                            styles={customStyles}
                            maxMenuHeight={150}
                          />
                        </SelectBoxHead>
                        <ErrorBox title={errors.skuId} />
                      </li>
                    </ul>
                    {skuData?.id && (
                      <section className={styles.platformCntr}>
                        <h4>{skuData?.desc}</h4>
                        <ul>
                          <li>
                            <b>Curriculum Name </b>
                            {skuData?.curriculumName}
                          </li>

                          <li>
                            <b>No. of devices</b>
                            {skuData?.noOdDevice}
                          </li>
                          <li>
                            <b>Validity (in days)</b>
                            {skuData?.validity}
                          </li>
                          <li>
                            <b>Professional Development</b>
                            {skuData?.isPd == "Y" ? "Yes" : "No"}
                          </li>
                        </ul>
                        <ul>
                          <li>
                            <b>Self Study </b>
                            <span>
                              {skuData?.isSelfStudy == "Y" ? "Yes" : "No"}
                            </span>
                          </li>
                          <li>
                            <b>SignUp</b>
                            <span>
                              {skuData?.isSignUp == "Y" ? "Yes" : "No"}
                            </span>
                          </li>
                          <li>
                            <b>VR Lab</b>
                            <span>
                              {skuData?.isVrLab == "Y" ? "Yes" : "No"}
                            </span>
                          </li>
                          {/* <li>
                          <b>Login via password</b>
                          <span>
                            {skuData?.loginViaPassword == "Y" ? "Yes" : "No"}
                          </span>
                        </li>
                        <li>
                          <b>Login via name</b>
                          <span>
                            {skuData?.loginViaName == "Y" ? "Yes" : "No"}
                          </span>
                        </li> */}
                        </ul>
                      </section>
                    )}

                    <li>
                      <DatePickers
                        selected={formData.licenseFrom}
                        minDate={new Date()}
                        onChange={(date) => {
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            ["licenseFrom"]: date,
                          }));
                          checkForLicenseTo(date);
                        }}
                        title="License from"
                      />

                      {<ErrorBox title={errors.licenseFrom} />}
                    </li>
                    {formData.licenseFrom && formData.skuId != -1 && (
                      <li>
                        <TextField
                          value={licenseTill}
                          label="License till"
                          fullWidth
                          className="customeFields"
                          variant="filled"
                          enab
                        />
                      </li>
                    )}
                    <li className="fullIn">
                      <TextField
                        onChange={handleChange}
                        onInput={(e) =>
                          (e.target.value = e.target.value
                            .replace(/[^0-9]/g, "")
                            .slice(0, 4))
                        }
                        id="noOfStudent"
                        value={formData.noOfStudent}
                        label="No of students"
                        fullWidth
                        variant="filled"
                        type="number"
                        className="customeFields"
                      />
                      <ErrorBox title={errors.noOfStudent} />
                    </li>
                  </Grid>
                </Grid>
              </Paper>
            )}

            {isNewSchool && (
              <Paper className={styles.addParts} elevation={3}>
                <Grid container>
                  <Grid item xs={4}></Grid>

                  <Grid item xs={8} className={styles.supportedLists}>
                    <h4>
                      Upload agreement document{" "}
                      <span>your basic account detail shows here</span>
                    </h4>
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
                              <Image
                                src={pdfDoc}
                                width={32}
                                height={32}
                                alt=""
                              />
                              <span>
                                <b>Uploaded by reseller</b>
                              </span>
                            </a>
                          </Link>
                        </section>
                      )}

                    <Grid className={`${styles.supportedDocuments} ${styles.addPartsList}`} item xs={12}>

                      <div className={`${styles.fileUploadContainer}`}>
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
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            )}
            <ErrorBox title={apiError} />
            {(isNewLicense || isNewSchool) && (
              <ButtonGlobal
                className={`${styles.saveClasses} ${styles.saveClassesBtn}`}
                disable={isProcessing}
                title={isProcessing ? "Processing" : "Save"}
                width="auto"
                onClick={handleSubmit}
              />
            )}
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
      {isRenewLicense && (
        <ModalGlobal
          activeState={isRenewLicense}
          onClick={setIsRenewLicense}
          heading="Renew license"
        >
          <Grid container>
            <Grid item xs={12}>
              <ul>
                {" "}
                <li>
                  <DatePickers
                    selected={renewLicenseFrom}
                    onChange={(date) => {
                      setRenewLicenseFrom(date);
                      checkForRenewalLicenseTo(date);
                    }}
                    title="License from"
                    minDate={new Date()}
                  />
                </li>
                {renewLicenseFrom && renewalSkuId != -1 && (
                  <li>
                    <TextField
                      value={renewalLicenseTill}
                      label="License till"
                      fullWidth
                      className="customeFields"
                      variant="filled"
                      enab
                    />
                  </li>
                )}
                <li className="fullIn">
                  <TextField
                    onChange={(e) => {
                      setRenewalNoOfStudents(e.target.value);
                    }}
                    onInput={(e) =>
                      (e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 4))
                    }
                    id="noOfStudent"
                    value={renewalNoOfStudents}
                    label="No of students"
                    fullWidth
                    variant="filled"
                    type="number"
                    className="customeFields"
                  />
                </li>{" "}
              </ul>

              <ErrorBox title={apiError} />
            </Grid>
            <Grid item xs={12} className={styles.renuLicns}>
              <ButtonGlobal
                disable={!renewLicenseFrom || renewalNoOfStudents == null}
                title={"Save"}
                width="auto"
                onClick={() => {
                  handleRenewSubmit();
                }}
              />
            </Grid>
          </Grid>
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default CreateOrder;
