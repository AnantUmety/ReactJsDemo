import React, { useEffect, useState } from "react";
import styles from "./changePassword.module.scss";
import Image from "next/image";
import ButtonGlobal from "@/component/ButtonGlobal";
import otpImage from "../../../public/images/global/otp.svg";
import OtpInput from "react-otp-input";
import { verifyOtpAction } from "@/redux/action/otpAction";
import { useDispatch } from "react-redux";
import { ErrorBoxRed } from "@/component/MessageBox/MessageBox";

function VerifyOTP(props) {
  const [otpValue, setOtpValue] = React.useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const handleChange = (otp) => {
    const numericOtp = otp.replace(/\D/g, "");
    setOtp(numericOtp);
  };

  const handleSubmit = () => {
    dispatch(
      verifyOtpAction({
        attribute: "email",
        otp: otp,
      })
    );
  };
  return (
    <div className={styles.changePasswordDv}>
      <figure>
        <Image src={otpImage} alt="" />
      </figure>
      <h2>Verify OTP</h2>
      <p>
        We have sent an OTP to your registered email ID. Please verify to
        successfully save the changes.
      </p>
      <OtpInput
        value={otp}
        numInputs={6}
        // renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle="globalOTP"
        isInputNum={true}
        shouldAutoFocus={true}
        onChange={handleChange}
        type="number"
      />

      <ul>
        {props.apiError?.length > 0 && (
          <li>
            <ErrorBoxRed title={props.apiError} />
          </li>
        )}
        
        <li className={styles.centerBox}>
          <ButtonGlobal
            title="Submit"
            disable={otp.split("").length === 6 ? false : true}
            width="auto"
            onClick={handleSubmit}
          />
        </li>
      </ul>
    </div>
  );
}

export default VerifyOTP;
