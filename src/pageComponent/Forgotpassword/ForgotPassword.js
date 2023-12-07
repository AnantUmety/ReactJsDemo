import React, { useEffect, useState } from "react";
import { BackBtn, WhiteBox } from "@/component/Assets/Elements";
import styles from "./forgotPassword.module.scss";
import { Logo } from "@/component/Assets/Library";
import subtract from "../../../public/images/global/subtract.png";
import Image from "next/image";
import { Grid } from "@mui/material";
import InputFields from "@/component/inputFields/InputFields";
import ButtonGlobal from "@/component/ButtonGlobal";
import { ErrorBox, SuccessBox } from "@/component/MessageBox/MessageBox";
import { forgotPasswordAction } from "@/redux/action/forgotPasswordAction";
import { useSelector, useDispatch } from "react-redux";
import { isValidEmail } from "@/utils/validation";

const ForgotPassword = ({
  from,
  hideLogo,
  className,
  setShowForgotPassword,
}) => {
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState({});
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { forgotPassword } = useSelector((state) => {
    return {
      forgotPassword: state?.forgotPassword?.forgotPwd,
    };
  });

  useEffect(() => {
    if (forgotPassword?.status == 200) {
      setSuccessMessage(forgotPassword?.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setShowForgotPassword(false);
      setIsProcessing(false);
    } else if (forgotPassword?.status == 400) {
      setApiError(forgotPassword?.message);
      setIsProcessing(false);
      setTimeout(() => {
        setApiError("");
      }, 3000);
    }
  }, [forgotPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let err = "";
    if (!apiData.EMAIL_ID) err = "Please enter email Id";
    else if (!isValidEmail(apiData.EMAIL_ID))
      err = "Please enter a valid email";

    if (err == "") {
      dispatch(forgotPasswordAction(apiData));
    } else {
      setError(err);
    }
  };

  return (
    <div className={`${[className && className]} ${styles.forgotPasswordCntr}`}>
      {!hideLogo && <Logo />}
      <WhiteBox className={styles.forgotWhiteBox}>
        {from != "setting" && (
          <BackBtn
            onClicked={() => setShowForgotPassword(false)}
            className={styles.backlink}
          />
        )}

        <Grid container>
          <Grid item xs={12} className={`${styles.forpassListCont} `}>
            <label>
              <Image src={subtract} alt="" />
            </label>
            <h2>Forgot password</h2>
            {from != "setting" ? (
              <h5>Enter the username or contact your admin.</h5>
            ) : (
              <h5>Enter the OTP and password or contact your admin.</h5>
            )}
          </Grid>
          <ErrorBox title={apiError} />
          <Grid item xs={12} className={styles.forpassList}>
            <InputFields
              id="email"
              onChange={(e) => {
                setApiData((prevFormData) => ({
                  ...prevFormData,
                  ["EMAIL_ID"]: e.target.value,
                }));
              }}
              placeholder="Your email"
            />
            <ErrorBox title={error} />
          </Grid>

          <Grid item xs={12} className={styles.forpassList}>
            <SuccessBox align="center" title={successMessage} />

            <ButtonGlobal
              onClick={handleSubmit}
              title={isProcessing ? "Processing" : "Submit"}
              size="medium"
            />
          </Grid>
        </Grid>
      </WhiteBox>
    </div>
  );
};

export default ForgotPassword;
