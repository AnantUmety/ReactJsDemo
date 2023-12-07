import {
  BackBtn,
  HeadingBox,
  SelectBoxHead,
  SelectNumber,
} from "@/component/Assets/Elements";
import ButtonGlobal from "@/component/ButtonGlobal";
import { Grid, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./addPartner.module.scss";
import plusCircle from "../../../public/images/addPartner/plusCircle.png";
import Image from "next/image";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import { useState } from "react";
import Select from "react-select";
import { customStyles } from "@/component/Assets/Elements";
import { useSelector, useDispatch } from "react-redux";
import { countryListAction } from "@/redux/action/countryListAction";
import { addResellerAction } from "@/redux/action/addResellerAction";
import urash from "../../../public/images/global/urash.png";
import { isValidEmail, isValidName } from "@/utils/validation";
import { getResellersAction } from "@/redux/action/getResellersAction";

const AddPartner = ({
  title,
  type = "add",
  onBackPressed,
  resellerUpdated,
  accesibleCountries = [],
  reportIwillAccess = [],
  reportcanAccessMine = [],
  formList = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phoneNo: "",
    countryId: -1,
    address: "",
    zipCode: "",
    accessibleCountryIds: null,
    reportWhomIwillAccess: null,
    reportWhoCanAccessMine: null,
    isApiEnable: 0,
    files: "",
    notification: null,
  },
}) => {
  const [selectedReportWhomIwillAccess, setSelectedReportWhomIwillAccess] =
    useState(reportIwillAccess);
  const [selectedAccesibleOption, setSelectedAccesibleOption] =
    useState(accesibleCountries);
  const [selectedReportWhoCanAccessMine, setSelectedReportWhoCanAccessMine] =
    useState(reportcanAccessMine);
  const [countries, setCountries] = useState([]);
  const [resellers, setResellers] = useState([]);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(formList?.notification);
  const [notificationObject, setNotificationObject] = useState({
    name: "",
    email: "",
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [count, setCount] = useState(formList?.notification?.length);
  const [apiError, setApiError] = useState("");
  const [addMoreError, setAddMoreError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(formList);
  const [countryCode, setCountryCode] = useState("");
  const [hideNotificationObj, setHideNotificationObj] = useState(false);
  let hitInitialApi = false;

  const { countryData, resellerList, addedReseller } = useSelector((state) => {
    return {
      countryData: state.globalData.globalData.countries,
      addedReseller: state.resellerData.addedReseller,
      resellerList: state?.resellerData?.resellerList?.rows,
    };
  });

  const departmentOptions = [
    { label: "Technical", value: "T" },
    { label: "Billing", value: "B" },
  ];

  const apiAccessOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];

  useEffect(() => {
    if (addedReseller) {
      if (addedReseller?.status == 200) resellerUpdated();
      else {
        formData.phoneNo = formData.phoneNo.substring(
          formData.phoneNo.length - 10,
          formData.phoneNo.length
        );
        setApiError(addedReseller?.message);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      }
      setIsProcessing(false);
    }
  }, [addedReseller]);

  useEffect(() => {
    if (countryData && countryData.length > 0 && countries.length == 0) {
      setCountries([]);
      let countryList = [];
      countryData.map((item) => {
        let country = { value: item.id, label: item.name };
        countryList.push(country);
        if (item.id == formData.countryId) {
          setCountryCode(item.code);
        }
      });

      setCountries(countryList);
    }
  }, [countryData]);

  useEffect(() => {
    if (resellerList && resellerList.length > 0 && resellers.length == 0) {
      setResellers([]);
      let resellerByIdData = [];
      resellerList.map((item) => {
        let resellerData = {
          value: item.resellerId,
          label: item.resellerFirstName + " " + item.resellerLastName,
        };
        resellerByIdData.push(resellerData);
      });
      setResellers(resellerByIdData);
    }
  }, [resellerList]);

  useEffect(() => {
    if (dispatch && !hitInitialApi) {
      hitInitialApi = true;
      dispatch(countryListAction());
      dispatch(getResellersAction("", 200));
    }
  }, [dispatch]);

  const handleChange = (event) => {
    let { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleNotification = (event) => {
    let { id, value } = event.target;
    if (id.includes("notname"))
      setNotificationObject((prevFormData) => ({
        ...prevFormData,
        ["name"]: value,
      }));
    if (id.includes("notemail"))
      setNotificationObject((prevFormData) => ({
        ...prevFormData,
        ["email"]: value,
      }));
  };

  const handleCountryChange = (obj) => {
    const { value, key, label } = obj;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["countryId"]: value,
    }));

    let country = countryData.find((item) => item.id == value);
    setCountryCode(country.code);
  };

  const handleDepartmentChange = (obj, index) => {
    const { value, key } = obj;
    setNotificationObject((prevFormData) => ({
      ...prevFormData,
      ["type"]: value,
    }));
  };

  const handleApiAccessChange = (obj) => {
    const { value, key } = obj;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["isApiEnable"]: value,
    }));
  };

  useEffect(() => {
    let data = [];
    selectedAccesibleOption?.map((item) => {
      data.push(item.value);
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      accessibleCountryIds: data.join(","),
    }));
  }, [selectedAccesibleOption]);

  useEffect(() => {
    let data = [];
    selectedReportWhoCanAccessMine?.map((item) => {
      data.push(item.value);
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      reportWhoCanAccessMine: data.join(","),
    }));
  }, [selectedReportWhoCanAccessMine]);

  useEffect(() => {
    let data = [];
    selectedReportWhomIwillAccess?.map((item) => {
      data.push(item.value);
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      reportWhomIwillAccess: data.join(","),
    }));
  }, [selectedReportWhomIwillAccess]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      setErrors({});

      if (
        notificationObject.name != "" ||
        notificationObject.email != "" ||
        notificationObject.type != ""
      )
        notification.push(notificationObject);
      formData.notification = notification;
      if (formData.phoneNo.length == 10)
        formData.phoneNo = countryCode + formData.phoneNo;
      if (formData.reportWhomIwillAccess == "")
        formData.reportWhomIwillAccess = null;
      if (formData.reportWhoCanAccessMine == "")
        formData.reportWhoCanAccessMine = null;

      if (type == "update") {
        // for accesible countries
        // let apiData = [];
        // accesibleCountries?.map((item) => {
        //   apiData.push(item.value.toString());
        // });

        // let selectedData =
        //   formData?.accessibleCountryIds == ""
        //     ? []
        //     : formData?.accessibleCountryIds?.split(",");
        // let differentData = apiData
        //   .filter((x) => !selectedData.includes(x))
        //   .concat(selectedData.filter((x) => !apiData.includes(x)));

        // if (differentData.length == 0) formData.accessibleCountryIds = null;
        // else formData.accessibleCountryIds = differentData.join(",");

        // for reportWhomIwillAccess
        let apiData = [];
        let selectedData = [];
        let differentData = [];
        reportIwillAccess?.map((item) => {
          apiData.push(item.value.toString());
        });
        selectedData =
          formData?.reportWhomIwillAccess == null ||
          formData?.reportWhomIwillAccess == ""
            ? []
            : formData?.reportWhomIwillAccess?.split(",");
        differentData = apiData
          .filter((x) => !selectedData.includes(x))
          .concat(selectedData.filter((x) => !apiData.includes(x)));

        if (differentData.length == 0) formData.reportWhomIwillAccess = null;
        else formData.reportWhomIwillAccess = differentData.join(",");

        apiData = selectedData = differentData = [];
        reportcanAccessMine?.map((item) => {
          apiData.push(item.value.toString());
        });

        selectedData =
          formData?.reportWhoCanAccessMine == null ||
          formData?.reportWhoCanAccessMine == ""
            ? []
            : formData?.reportWhoCanAccessMine?.split(",");
        differentData = apiData
          .filter((x) => !selectedData.includes(x))
          .concat(selectedData.filter((x) => !apiData.includes(x)));
        if (differentData.length == 0) formData.reportWhoCanAccessMine = null;
        else formData.reportWhoCanAccessMine = differentData.join(",");

        if (notification?.length == 0) formData.notification = null;
      }
      dispatch(addResellerAction(formData, type));
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
    if (!formData.companyName) {
      errorData.companyName = "Please enter company name";
    }
    if (!formData.phoneNo) {
      errorData.phoneNo = "Please enter phone number";
    } else if (formData.phoneNo.replaceAll("0", " ").trim().length == 0) {
      errorData.phoneNo = "Invalid phone number";
    }
    if (!formData.email) {
      errorData.email = "Please enter email";
    } else if (!isValidEmail(formData.email)) {
      errorData.firstName = "Invalid email";
    }
    if (formData.countryId == -1) {
      errorData.countryId = "Please select country";
    }
    if (!formData.address) {
      errorData.address = "Please enter address";
    }
    if (!formData.zipCode) {
      errorData.zipCode = "Please enter zip code";
    }
    if (!formData.accessibleCountryIds) {
      errorData.accessibleCountryIds = "Please select accessible country";
    }
    if (!formData.files) {
      errorData.files = "Please enter file url";
    }
    return errorData;
  };

  return (
    <div className={styles.addPartner}>
      <BackBtn path="" onClicked={onBackPressed} />
      <HeadingBox title={title} />

      <Grid item xs={12}>
        <Paper className={styles.addParts} elevation={3}>
          <Grid container>
            <Grid item xs={4}>
              <h4>
                Basic details <span>your basic account detail shows here</span>
              </h4>
            </Grid>
            <Grid className={styles.addPartsList} item xs={8}>
              <ul className="halfBox">
                {/* <li>
                  <TextField
                    label="User name*"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    fullWidth
                    disabled={type == "update"}
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.username} />
                </li> */}

                <li>
                  <TextField
                    id="firstName"
                    label="First name*"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.firstName} />
                </li>
                <li>
                  <TextField
                    id="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                    label="Last name*"
                    fullWidth
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.lastName} />
                </li>
                <li>
                  <TextField
                    id="companyName"
                    onChange={handleChange}
                    value={formData.companyName}
                    label="Company name*"
                    fullWidth
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.companyName} />
                </li>
              </ul>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={styles.addParts} elevation={3}>
          <Grid container>
            <Grid item xs={4}>
              <h4>
                Contact info <span>Your contact details</span>
              </h4>
            </Grid>
            <Grid className={styles.addPartsList} item xs={8}>
              <ul>
                <li>
                  <SelectBoxHead
                    title={formData?.countryId != -1 && "Select country*"}
                  >
                    <Select
                      maxMenuHeight={150}
                      id="countryId"
                      options={countries}
                      value={
                        formData?.countryId != -1 && countries.length > 0
                          ? {
                              value: formData?.countryId,
                              label: countries?.find(
                                (data) => data.value == formData?.countryId
                              ).label,
                            }
                          : null
                      }
                      onChange={handleCountryChange}
                      placeholder="Select country*"
                      styles={customStyles}
                    />
                  </SelectBoxHead>
                  <ErrorBox title={errors?.countryId} />
                </li>
                <li className={styles.positionDiv}>
                  <h6>{countryCode}</h6>

                  <TextField
                    id="phoneNo"
                    onChange={handleChange}
                    value={formData.phoneNo}
                    label="Phone number*"
                    variant="filled"
                    fullWidth
                    type="tel"
                    className={`customeFields ${
                      formData?.countryId !== -1 && "customeFieldsPassword"
                    }`}
                    onInput={(e) =>
                      (e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10))
                    }
                  />

                  <ErrorBox title={errors?.phoneNo} />
                </li>
                <li>
                  <TextField
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    label="Email*"
                    fullWidth
                    variant="filled"
                    type="email"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.email} />
                </li>

                <li>
                  <TextField
                    id="address"
                    onChange={handleChange}
                    value={formData.address}
                    label="Address*"
                    fullWidth
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.address} />
                </li>
                <li>
                  <TextField
                    id="zipCode"
                    onChange={handleChange}
                    value={formData.zipCode}
                    label="Zipcode*"
                    fullWidth
                    variant="filled"
                    className="customeFields"
                    onInput={(e) =>
                      (e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 6))
                    }
                  />
                  <ErrorBox title={errors?.zipCode} />
                </li>
              </ul>
            </Grid>
          </Grid>
        </Paper>

        <Paper className={styles.addParts} elevation={3}>
          <Grid container>
            <Grid item xs={4}>
              <h4>
                Reports and accessibility{" "}
                <span>Add accessibility details.</span>
              </h4>
            </Grid>
            <Grid className={styles.addPartsList} item xs={8}>
              <ul>
                <li>
                  <SelectBoxHead
                    title={
                      selectedAccesibleOption.length > 0 &&
                      "Accessible countries (None )*"
                    }
                  >
                    <Select
                      options={countries}
                      value={selectedAccesibleOption}
                      onChange={(option) => setSelectedAccesibleOption(option)}
                      isMulti
                      placeholder="Accessible countries (None )*"
                      styles={customStyles}
                      closeMenuOnSelect={false}
                      maxMenuHeight={150}
                    />
                  </SelectBoxHead>
                  <ErrorBox title={errors?.accessibleCountryIds} />
                </li>
                <li>
                  <SelectBoxHead
                    title={
                      selectedReportWhomIwillAccess.length > 0 &&
                      "Report (whom I will access )"
                    }
                  >
                    <Select
                      options={resellers}
                      value={selectedReportWhomIwillAccess}
                      onChange={(option) =>
                        setSelectedReportWhomIwillAccess(option)
                      }
                      placeholder="Report (whom I will access )"
                      isMulti
                      styles={customStyles}
                      closeMenuOnSelect={false}
                      maxMenuHeight={150}
                    />
                  </SelectBoxHead>
                  <ErrorBox title={errors?.reportWhomIwillAccess} />
                </li>
                <li>
                  <SelectBoxHead
                    title={
                      selectedReportWhoCanAccessMine.length > 0 &&
                      "Report (who can access mine)"
                    }
                  >
                    <Select
                      options={resellers}
                      value={selectedReportWhoCanAccessMine}
                      onChange={(option) =>
                        setSelectedReportWhoCanAccessMine(option)
                      }
                      placeholder="Report (who can access mine)"
                      isMulti
                      styles={customStyles}
                      closeMenuOnSelect={false}
                      maxMenuHeight={150}
                    />
                  </SelectBoxHead>
                  <ErrorBox title={errors?.reportWhoCanAccessMine} />
                </li>
                <li>
                  <TextField
                    id="files"
                    onChange={handleChange}
                    value={formData.files}
                    label="Files"
                    fullWidth
                    variant="filled"
                    className="customeFields"
                  />
                  <ErrorBox title={errors?.files} />
                </li>
                <li>
                  <SelectBoxHead
                    title={
                      formData?.isApiEnable.toString() && "Choose API Access*"
                    }
                  >
                    <Select
                      options={apiAccessOptions}
                      value={{
                        value: formData?.isApiEnable.toString(),
                        label: apiAccessOptions.find(
                          (data) => data.value == formData?.isApiEnable
                        ).label,
                      }}
                      onChange={handleApiAccessChange}
                      placeholder="Choose API Access*"
                      styles={customStyles}
                      maxMenuHeight={150}
                    />
                  </SelectBoxHead>
                  <ErrorBox title={errors?.isApiEnable} />
                </li>
              </ul>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          className={`${styles.addParts} ${styles.addPartsShift}`}
          elevation={3}
        >
          <Grid container>
            <Grid item xs={4} className={styles.addPartsLists}>
              <h4>
                Notification <span>Add who will get notification.</span>
              </h4>
            </Grid>

            {count > 0 &&
              notification?.map((item, index) => {
                return (
                  <Grid
                    className={`${styles.addPartsList} ${styles.addPartsListLoop} `}
                    item
                    xs={12}
                  >
                    <ul>
                      <li className={styles.personBtn}>
                        {" "}
                        {`Person ${index + 1}`}
                        <button
                          className={styles.addMores}
                          onClick={() => {
                            let n = notification;
                            n.splice(index, 1);
                            setNotification(n);
                            setCount(n.length);
                          }}
                        >
                          <span>
                            Remove
                            <Image src={urash} alt="" />
                          </span>
                        </button>
                      </li>

                      <li>
                        <TextField
                          disabled={true}
                          id={"notname" + index}
                          label="Name"
                          fullWidth
                          value={item.name}
                          variant="filled"
                          className="customeFields"
                          onChange={handleNotification}
                        />
                        {/* <ErrorBox title="error" /> */}
                      </li>
                      <li>
                        <TextField
                          disabled={true}
                          id={"notemail" + index}
                          label="Email"
                          fullWidth
                          value={item.email}
                          variant="filled"
                          type="email"
                          className="customeFields"
                          onChange={handleNotification}
                        />
                        {/* <ErrorBox title="error" /> */}
                      </li>

                      <li>
                        <TextField
                          disabled={true}
                          id={"notDepartment" + index}
                          label="Department"
                          fullWidth
                          value={
                            departmentOptions.find(
                              (data) => data.value == item.type
                            ).label
                          }
                          variant="filled"
                          className="customeFields"
                          onChange={handleNotification}
                        />
                      </li>
                    </ul>
                  </Grid>
                );
              })}
            {!hideNotificationObj && (
              <Grid
                className={`${styles.addPartsListLoops} ${styles.addPartsList}`}
                item
                xs={12}
              >
                <ul>
                  <li className={styles.personBtn}>
                    {" "}
                    {notification?.length > 0
                      ? `Person ${notification?.length + 1}`
                      : `Person 1`}
                    <button
                      className={styles.addMores}
                      onClick={() => {
                        setHideNotificationObj(true);
                        setNotificationObject({
                          name: "",
                          type: "",
                          email: "",
                        });
                      }}
                    >
                      <span>
                        Remove
                        <Image src={urash} alt="" />
                      </span>
                    </button>
                  </li>

                  <li>
                    <TextField
                      id={"notnameObj"}
                      label="Name"
                      fullWidth
                      value={notificationObject.name}
                      variant="filled"
                      className="customeFields"
                      onChange={handleNotification}
                    />
                  </li>
                  <li>
                    <TextField
                      id={"notemailObj"}
                      label="Email"
                      fullWidth
                      value={notificationObject.email}
                      variant="filled"
                      type="email"
                      className="customeFields"
                      onChange={handleNotification}
                    />
                  </li>

                  <li>
                    <SelectBoxHead
                      title={notificationObject.type && "Department"}
                    >
                      <Select
                        options={departmentOptions}
                        value={
                          notificationObject.type &&
                          notificationObject.type != ""
                            ? {
                                value: notificationObject.type,
                                label: departmentOptions.find(
                                  (data) =>
                                    data.value == notificationObject.type
                                ).label,
                              }
                            : null
                        }
                        onChange={(e) => handleDepartmentChange(e)}
                        placeholder="Department"
                        styles={customStyles}
                        maxMenuHeight={150}
                      />
                    </SelectBoxHead>
                  </li>
                </ul>
              </Grid>
            )}

            <ul className={styles.addMoreDiv}>
              <li>
                <ErrorBox title={addMoreError} />
                <button
                  className={styles.addMores}
                  onClick={() => {
                    if (hideNotificationObj) setHideNotificationObj(false);
                    else if (
                      notificationObject.name != "" &&
                      notificationObject.type != "" &&
                      notificationObject.email != ""
                    ) {
                      let n = notification;
                      if (n == null) n = [];
                      n.push(notificationObject);
                      setNotification(n);
                      setCount(n.length);
                      setNotificationObject({
                        name: "",
                        type: "",
                        email: "",
                      });
                    } else {
                      setAddMoreError(
                        "Please fill the previous person details first."
                      );
                      setTimeout(() => {
                        setAddMoreError("");
                      }, 3000);
                    }
                  }}
                >
                  <b>
                    <Image width={24} height={24} src={plusCircle} alt="" />
                  </b>{" "}
                  <span>
                    {hideNotificationObj && notification.length == 0
                      ? "Add"
                      : "Add more"}
                  </span>
                </button>
              </li>

              <li>
                <ErrorBox title={apiError} />
                <ButtonGlobal
                  disable={isProcessing}
                  title={isProcessing ? "Processing" : "Save"}
                  width="auto"
                  onClick={handleSubmit}
                />
              </li>
            </ul>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default AddPartner;
