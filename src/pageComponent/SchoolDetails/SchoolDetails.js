import React, { useState, useEffect, Fragment, useRef } from "react";
import styles from "./schoolDeatil.module.scss";
import Image from "next/image";
import scl from "../../../public/images/logistics/scl.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaCrown } from "react-icons/fa";
import { DatePickers, HeadingBox } from "@/component/Assets/Elements";
import dynamic from "next/dynamic";
import ModalGlobal from "@/component/ModalGlobal";
import LeaveComment from "./LeaveComment";
import Link from "next/link";
import pdfDoc from "../../../public/images/global/pdfDoc.svg";
import { useSelector, useDispatch } from "react-redux";
import { getOrganizationDetailByIDAction } from "@/redux/action/getOrganizationDetailByIDAction";
import AddLicense from "../AddLicense/AddLicense";
import { getLicenseByOrgIdAction } from "@/redux/action/getLicenseByOrgIdAction";
import AddSchool from "../AddSchool/AddSchool";
import { Grid, TextField } from "@mui/material";
import { TabContainer, TabHeader } from "@/component/Tabbing/Tab";
import Table from "@/component/Table";
import DeleteBox from "@/component/Delete";
import AddAdmin from "./AddAdmin";
import { getSkuDescriptionAction } from "@/redux/action/getSkuDescriptionAction";
import moment from "moment";
import { addLicenseAction } from "@/redux/action/addLicenseAction";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import {
  RESET_ADD_ADMIN,
  RESET_ADD_LICENSE,
  RESET_SKU_DESCRIPTION,
} from "@/redux/constants";
import { getSchoolAdminByOrgIdAction } from "@/redux/action/getSchoolAdminByOrgIdAction";
import { resetSchoolPinAction } from "@/redux/action/resetSchoolPinAction";
import { getSchoolDeviceByOrgIdAction } from "@/redux/action/getSchoolDeviceByOrgIdAction";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SchoolDetails = ({ schoolId = -1 }) => {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState(false);
  const [schoolData, setSchoolData] = useState({});
  const [licenseData, setLicenseData] = useState([]);
  const [deviceListing, setDeviceListing] = useState([]);
  const [schoolAdminData, setSchoolAdminData] = useState([]);
  const [isAddLicense, setIsAddLicense] = useState(false);
  const [isEditSchool, setIsEditSchool] = useState(false);

  const [schoolDataToUpdate, setSchoolDataToUpdate] = useState({});
  const [isTabOpen, setIsTabOpen] = useState(0);
  const [isAccord, setIsAccord] = useState(false);
  const [isAccordOpen, setIsAccordOpen] = useState(false);
  const [isDelete, setIsdelete] = useState(false);
  const [isResetPin, setIsResetPin] = useState(false);
  const [isAddAdmin, setIsAddAdmin] = useState(false);
  const [skuDesc, setSkuDesc] = useState({});
  const [isRenewLicense, setIsRenewLicense] = useState(false);
  const [renewLicenseFrom, setRenewLicenseFrom] = useState(null);
  const [renewalSkuId, setRenewwalSkuId] = useState(-1);
  const [apiError, setApiError] = useState("");
  const [pin, setPin] = useState("");

  const {
    schoolDetail,
    licenseDetail,
    skuDetail,
    addedLicense,
    adminListing,
    resetPin,
    schoolDevices,
  } = useSelector((state) => {
    return {
      addedLicense: state?.organizationData?.addLicense,
      schoolDetail: state?.organizationData?.organizationDetailById,
      licenseDetail: state?.organizationData?.schoolLicense?.rows,
      skuDetail: state?.sku?.skuDetail,
      adminListing: state?.organizationData?.adminListing?.rows,
      resetPin: state?.organizationData?.resetPin,
      schoolDevices: state?.organizationData?.schoolDevices?.rows,
    };
  });

  useEffect(() => {
    if (addedLicense) {
      if (addedLicense?.status == 200) {
        setIsRenewLicense(false);
        setRenewLicenseFrom(null);
        setRenewwalSkuId(-1);
        dispatch({ type: RESET_ADD_LICENSE });
        dispatch({ type: RESET_SKU_DESCRIPTION });
        setLicenseData([]);
        dispatch(getLicenseByOrgIdAction(schoolId));
      } else {
        setApiError(addedLicense?.message);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      }
    }
  }, [addedLicense]);

  useEffect(() => {
    if (schoolDetail) {
      setSchoolData(schoolDetail);
    }
  }, [schoolDetail]);

  useEffect(() => {
    if (licenseDetail?.length > 0 && licenseData?.length == 0) {
      setLicenseData(licenseDetail);
    }
  }, [licenseDetail]);

  useEffect(() => {
    if (schoolDevices?.length > 0 && deviceListing?.length == 0) {
      setDeviceListing(schoolDevices);
    }
  }, [schoolDevices]);

  useEffect(() => {
    if (adminListing?.length > 0 && schoolAdminData?.length == 0) {
      setSchoolAdminData(adminListing);
    }
  }, [adminListing]);

  useEffect(() => {
    if (schoolId != -1) {
      dispatch(getOrganizationDetailByIDAction(schoolId));
      dispatch(getLicenseByOrgIdAction(schoolId));
      dispatch(getSchoolAdminByOrgIdAction(schoolId));
      dispatch(getSchoolDeviceByOrgIdAction(schoolId));
    }
  }, [schoolId]);

  useEffect(() => {
    if (skuDetail?.id) {
      setSkuDesc(skuDetail);
    }
  }, [skuDetail]);

  const onBackPressed = () => {
    setIsEditSchool(false);
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
        <h4>{skuDesc?.desc}</h4>
        <ul>
          <li>
            <b>Curriculum Name </b>
            {skuDesc?.curriculumName}
          </li>

          <li>
            <b>No. of devices</b>
            {skuDesc?.noOdDevice}
          </li>
          <li>
            <b>Validity (in days)</b>
            {skuDesc?.validity}
          </li>
          <li>
            <b>Professional Development</b>
            {skuDesc?.isPd == "Y" ? "Yes" : "No"}
          </li>
        </ul>

        <ul>
          <li>
            <b>Self Study </b>
            <span>{skuDesc?.isSelfStudy == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>SignUp</b>
            <span>{skuDesc?.isSignUp == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>VR Lab</b>
            <span>{skuDesc?.isVrLab == "Y" ? "Yes" : "No"}</span>
          </li>
          {/* <li>
            <b>Login via password</b>
            <span>{skuDesc?.loginViaPassword == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>Login via name</b>
            <span>{skuDesc?.loginViaName == "Y" ? "Yes" : "No"}</span>
          </li> */}
        </ul>
        {/* {status == "E" && (
          <ButtonGlobal
            width="auto"
            title="Renew License"
            onClick={() => {
              setRenewwalSkuId(skuDesc.id);
              setIsRenewLicense(true);
            }}
          />
        )} */}
      </section>
    );
  };

  const licenseHandler = (id, licenceFrom) => {
    setIsAccord(!isAccord);
    if (isAccordOpen === id + licenceFrom) {
      setSkuDesc({});
      return setIsAccordOpen(null);
    } else {
      dispatch(getSkuDescriptionAction(id));
      setIsAccordOpen(id + licenceFrom);
    }
  };

  const licenseDetailView = (row) => {
    return (
      <Fragment>
        <button
          onClick={() => licenseHandler(row.skuId, row.licenceFrom)}
          className={styles.addedit}
        >
          {row.skuId + row.licenceFrom == isAccordOpen ? (
            <HiMinusSm />
          ) : (
            <HiPlusSm />
          )}
        </button>
        {row.skuId + row.licenceFrom == isAccordOpen && skuDesc?.desc && (
          <LicenseDataList licenceFrom={row.licenceFrom} />
        )}
      </Fragment>
    );
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

  const licenseFromHandler = (data) => {
    return <p>{moment(data?.licenceFrom).format("Do MMMM  YYYY")}</p>;
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

  const threeDotHandler = (row) => {
    console.log("row", row?.isPrimary)
    let stylesData = {pointerEvents: row?.isPrimary !== 1 ? "auto" : "none", opacity: row?.isPrimary !== 1 ? "1" : "0.2"}
    return (
      <button
        style={stylesData} 
        onClick={() => setIsdelete(!isDelete)}
        className={styles.deleteHand}
      >
        <AiTwotoneDelete />
      </button>
    );
  };

  const adminAdded = () => {
    dispatch({ type: RESET_ADD_ADMIN });
    setIsAddAdmin(false);
    setSchoolAdminData([]);
    dispatch(getSchoolAdminByOrgIdAction(schoolId));
  };

  const columns2 = [
    {
      Header: "Full name",
      accessor: "firstName",
      canSort: true,
      Cell: (info) => {
        const { row } = info;
        return (
          <p>
            {row.original.firstName} {row.original.lastName}
            {row.original.isPrimary == 1 ? <FaCrown /> : null}
          </p>
        );
      },
    },
    {
      Header: "Phone",
      accessor: "phoneNo",
      canSort: true,
      Cell: (info) => {
        const { row } = info;
        return (
          <p>{row.original.phoneNo != null ? row.original.phoneNo : "--"}</p>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email",
      canSort: true,
    },
    {
      Header: "Action",
      accessor: threeDotHandler,
      arrow: true,
      width: 150,
    },
  ];

  const schoolDataUpdated = () => {
    window.location.reload();
  };

  const handleRenewSubmit = () => {
    const apiData = {
      skuId: renewalSkuId,
      orgId: schoolData.orgId,
      licenseFrom: renewLicenseFrom,
      isRenewal: "Y",
      renewalSkuId: renewalSkuId,
    };

    dispatch(addLicenseAction(apiData));
  };

  const handleResetPin = () => {
    const apiData = {
      pin: pin,
    };

    dispatch(resetSchoolPinAction(apiData));
  };

  return (
    <Fragment>
      {!isAddLicense && !isEditSchool && (
        <div className={styles.schoolDetailsCenter}>
          <div className={styles.schoolDetailsLeft}>
            <section className={styles.scDetImg}>
              <label>
                <Image src={scl} alt="" />
              </label>
              <h4>
                <i>{schoolData.orgName}</i>
                <span>
                  {schoolData.address} , {schoolData.districtName}
                </span>
              </h4>
              {/* <ButtonGlobal
                onClick={() => setIsComment(!isComment)}
                width="auto"
                title="Approve"
                bgColor="green"
              /> */}
            </section>

            <section className={styles.showCartDiv}>
              <aside>
                <HeadingBox width="auto" title="License information" />
                {isTabOpen === 1 && (
                  <ButtonGlobal
                    onClick={() => setIsAddAdmin(!isAddAdmin)}
                    className={styles.addAdmin}
                    width="auto"
                    title="Add Admin"
                  />
                )}
                {/* {isTabOpen === 0 && (
                  <ButtonGlobal
                    width="auto"
                    title="Add License"
                    onClick={() => {
                      dispatch({ type: RESET_ADD_LICENSE });
                      dispatch({ type: RESET_SKU_DESCRIPTION });
                      setIsAddLicense(true);
                    }}
                  />
                )} */}
              </aside>
            </section>

            <Grid container className={styles.schoolDetailTabs}>
              <Grid item xs={12}>
                <TabHeader
                  isOpen={isTabOpen}
                  setIsOpen={setIsTabOpen}
                  data={[
                    { title: "License" },
                    { title: "Admin" },
                    { title: "Devices" },
                  ]}
                  black
                />
              </Grid>
              <Grid item xs={12}>
                <TabContainer value={0} isOpen={isTabOpen}>
                  <Table
                    className={styles.customeTableDetails}
                    rightSearch
                    data={licenseData}
                    limit={20}
                    columns={licenseColumns}
                  />
                </TabContainer>
                <TabContainer value={1} isOpen={isTabOpen}>
                  <Table
                    className={styles.customTableAdmin}
                    rightSearch
                    data={schoolAdminData}
                    limit={10}
                    columns={columns2}
                  />
                </TabContainer>
                <TabContainer value={2} isOpen={isTabOpen}>
                  {deviceListing.length == 0 ? (
                    "No devvice added"
                  ) : (
                    <ul >
                      {deviceListing?.map((item) => {
                        return <li>{item.deviceName}</li>;
                      })}
                    </ul>
                  )}
                  {/* deviceListing
                  vaishali
                  <Table
                    className={styles.customeTableDetails}
                    rightSearch
                    data={licenseData}
                    limit={20}
                    columns={licenseColumns}
                  /> */}
                </TabContainer>
              </Grid>
            </Grid>
          </div>

          <div className={styles.schoolDetailsRight}>
            <section>
              <div className={styles.aboutSchoolDv}>
                <h2>About school</h2>
                {/* <Image
                  src={edit}
                  alt=""
                  className={styles.aboutSchl}
                  onClick={() => {
                    const formList = {
                      firstName: schoolData.schoolAdminFirstName,
                      orgId: schoolData.orgId,
                      schoolAdminId: schoolData.schoolAdminId,
                      lastName: schoolData.schoolAdminLastName,
                      schoolName: schoolData.orgName,
                      email: schoolData.schoolAdminEmail,
                      orgAddress: schoolData.address,
                      countryId: schoolData.countryId,
                      zipCode: schoolData.zipcode,
                      phoneNo: schoolData.phoneNo.substring(
                        schoolData.phoneNo.length - 10,
                        schoolData.phoneNo.length
                      ),
                      districtId: schoolData.districtId,
                      isLogo: schoolData.isLogo,
                    };

                    setSchoolDataToUpdate(formList);
                    setIsEditSchool(true);
                  }}
                /> */}
              </div>
              <ul>
                <li>
                  <b>Account ID </b>
                  {schoolData.accountId}
                </li>
                <li>
                  <b>School name </b>
                  {schoolData.orgName}
                </li>
                <li>
                  <b>Admin name</b>
                  {schoolData.schoolAdminFirstName}{" "}
                  {schoolData.schoolAdminLastName}
                </li>
                <li>
                  <b>Admin phone</b>
                  {schoolData.phoneNo}
                </li>
                <li>
                  <b>Admin email</b>
                  {schoolData.schoolAdminEmail}
                </li>

                <li>
                  <b>Country</b>
                  {schoolData.countryName}
                </li>
              </ul>
            </section>

            {schoolData.agreementDoc && (
              <section>
                <h2>Supported documents</h2>
                <Link href={schoolData.agreementDoc} legacyBehavior>
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
            <section>
              <h2>Support team</h2>
              <ul>
                <li>
                  <b>Reseller</b>
                  {schoolData.resellerFirstName} {schoolData.resellerLastName}
                </li>
                <li>
                  <b>Reseller email</b>
                  {schoolData.resellerEmail}
                </li>
              </ul>
            </section>

            {/* <ButtonGlobal
              onClick={() => setIsResetPin(!isResetPin)}
              className={styles.addAdmin}
              width="auto"
              title="Reset pin"
            /> */}
          </div>
        </div>
      )}
      {isComment && (
        <ModalGlobal activeState={isComment} onClick={setIsComment}>
          <LeaveComment />
        </ModalGlobal>
      )}

      {isAddLicense && (
        <AddLicense setIsAddLicense={setIsAddLicense} orgId={schoolId} />
      )}
      {isEditSchool && (
        <AddSchool
          resellerId={""}
          schoolAgreement={schoolData?.agreementDoc}
          formList={schoolDataToUpdate}
          schoolUpdated={schoolDataUpdated}
          title="Update School"
          onBackPressed={onBackPressed}
          type="update"
        />
      )}

      {isDelete && (
        <ModalGlobal activeState={isDelete} onClick={setIsdelete}>
          <DeleteBox setIsdelete={setIsdelete} />
        </ModalGlobal>
      )}

      {isResetPin && (
        <ModalGlobal activeState={isResetPin} onClick={setIsResetPin}>
          <div className={styles.addAdmForm}>
            {/* <form onSubmit={handleResetPin}> */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                  }}
                  name="pin"
                  id="pin"
                  label="pin"
                  variant="filled"
                  fullWidth
                  className="customeFields"
                  onInput={(e) =>
                    (e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 4))
                  }
                />
                {/* { <ErrorBox title={error.username} />} */}
              </Grid>

              <Grid item xs={12}>
                <ButtonGlobal
                  type="submit"
                  title="Submit"
                  width="auto"
                  onClick={() => {
                    handleResetPin();
                  }}
                />
              </Grid>
            </Grid>
            {/* </form> */}
          </div>
        </ModalGlobal>
      )}

      {isAddAdmin && (
        <ModalGlobal
          heading="Add Admin"
          width="medium"
          activeState={isAddAdmin}
          onClick={setIsAddAdmin}
        >
          <AddAdmin orgId={schoolId} adminAdded={adminAdded} />
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
              <DatePickers
                selected={renewLicenseFrom}
                onChange={(date) => setRenewLicenseFrom(date)}
                title="License from"
                minDate={new Date()}
              />
              <ErrorBox title={apiError} />
            </Grid>
            <Grid item xs={12} className={styles.renuLicns}>
              <ButtonGlobal
                disable={!renewLicenseFrom}
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

export default SchoolDetails;
