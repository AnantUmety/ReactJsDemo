import {
  BackBtn,
  HeadingBox,
  SelectBoxHead,
} from "@/component/Assets/Elements";
import { Grid, Paper } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import styles from "../AddPartner/addPartner.module.scss";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import { useState } from "react";
import Select from "react-select";
import { customStyles } from "@/component/Assets/Elements";
import ButtonGlobal from "@/component/ButtonGlobal";
import { useSelector, useDispatch } from "react-redux";
import { DatePickers } from "@/component/Assets/Elements";
import { addLicenseAction } from "@/redux/action/addLicenseAction";
import { getSkuListAction } from "@/redux/action/getSkuListAction";
import { getSkuDescriptionAction } from "@/redux/action/getSkuDescriptionAction";
import { RESET_ADD_LICENSE, RESET_SKU_DESCRIPTION } from "@/redux/constants";

const AddLicense = ({ setIsAddLicense, orgId, licenseSaved }) => {
  const dispatch = useDispatch();
  const [error, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [skuList, setSkuList] = useState([]);
  const [skuData, setSkuData] = useState({});

  let hitInitialApi = false;
  const formList = {
    skuId: -1,
    orgId: orgId,
    licenseFrom: null,
    isRenewal: "N",
    renewalSkuId: null,
  };

  const [formData, setFormData] = useState(formList);
  const { skuListing, skuDetail, addedLicense } = useSelector((state) => {
    return {
      addedLicense: state?.organizationData?.addLicense,
      skuListing: state?.sku?.skuListing,
      skuDetail: state?.sku?.skuDetail,
    };
  });

  useEffect(() => {
    if (addedLicense) {
      if (addedLicense?.status == 200) {
        dispatch({ type: RESET_ADD_LICENSE });
        dispatch({ type: RESET_SKU_DESCRIPTION });
        setIsAddLicense(false);
        if (licenseSaved) licenseSaved();
      } else {
        setApiError(addedLicense?.message);
        setTimeout(() => {
          setApiError("");
        }, 3000);
      }
      setIsProcessing(false);
    }
  }, [addedLicense]);

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
    }
  }, [skuDetail]);

  useEffect(() => {
    if (dispatch && !hitInitialApi) {
      hitInitialApi = true;
      dispatch(getSkuListAction());
    }
  }, [dispatch]);

  const handlSubmit = () => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      setErrors({});
      dispatch(addLicenseAction(formData, "add"));
      setIsProcessing(true);
    } else {
      setErrors(validationErrors);
    }
  };
  const validateForm = () => {
    let errorData = {};

    if (!formData?.skuId) {
      errorData.skuId = "Please select SKU";
    }
    if (!formData?.licenseFrom) {
      errorData.licenseFrom = "Please select license from";
    }
    // if (formData?.isRenewal == "Y" && !formData?.renewalSkuId) {
    //   errorData.renewalSkuId = "Please select platform license to";
    // }

    return errorData;
  };

  const handleSelectChangeSku = (obj) => {
    const { value } = obj;
    dispatch(getSkuDescriptionAction(value));
    setSkuData({});
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["skuId"]: value,
    }));
  };
  return (
    <Fragment>
      <div className={styles.addPartner}>
        <BackBtn
          onClicked={() => {
            dispatch({ type: RESET_ADD_LICENSE });
            dispatch({ type: RESET_SKU_DESCRIPTION });
            setIsAddLicense(false);
            if (licenseSaved) licenseSaved();
          }}
        />
        <HeadingBox title="Add license" />
        <Grid item xs={12}>
          <>
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
                      <ErrorBox title={error.skuId} />
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
                          <span>{skuData?.isSignUp == "Y" ? "Yes" : "No"}</span>
                        </li>
                        <li>
                          <b>VR Lab</b>
                          <span>{skuData?.isVrLab == "Y" ? "Yes" : "No"}</span>
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
                      onChange={(date) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          ["licenseFrom"]: date,
                        }))
                      }
                      title="License from"
                    />

                    {<ErrorBox title={error.licenseFrom} />}
                  </li>
                </Grid>
              </Grid>
            </Paper>
          </>

          <ErrorBox title={apiError} />

          <Paper className={styles.addParts} elevation={3}>
            <Grid container>
              <Grid item xs={4}>
                <h4></h4>
              </Grid>
              <Grid item xs={4}>
                <ButtonGlobal
                  disable={isProcessing}
                  className={`${
                    formData.contentLicense
                      ? styles.saveLicance
                      : styles.saveLicanceTwos
                  }`}
                  title={isProcessing ? "Processing" : "Save license"}
                  width="auto"
                  onClick={() => {
                    handlSubmit();
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </div>
    </Fragment>
  );
};

export default AddLicense;
