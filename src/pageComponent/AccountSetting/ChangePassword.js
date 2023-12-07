import React, { useState, useEffect } from "react";
import styles from "./changePassword.module.scss";
import Image from "next/image";
import { TextField } from "@mui/material";
import { ButtonLink } from "@/component/Assets/Elements";
import lock from "../../../public/images/global/lock.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import info from "../../../public/images/global/info.svg";
import { useTranslation } from "next-i18next";
import { ErrorBox, SuccessBox } from "@/component/MessageBox/MessageBox";
import { changePasswordAction } from "@/redux/action/changePasswordAction";
import { forgotPasswordAction } from "@/redux/action/forgotPasswordAction";

import { useSelector, useDispatch } from "react-redux";
import { isValidPassword } from "@/utils/validation";
import {
  RESET_CHANGE_PASSWORD,
  RESET_FORGOT_PASSWORD,
} from "@/redux/constants";
import InputFields from "@/component/inputFields/InputFields";

function ChangePassword({
  setIsChangePassword,
  userId,
  email
}) {
  const { forgotPasswordData, changePasswordData } = useSelector((state) => {
    return {
      forgotPasswordData: state?.forgotPassword?.forgotPwd,
      changePasswordData: state?.changePassword?.changePwd
    };
  });

  const formList = {
    userId: userId,
    password: "",
    conf_password: "",
    old_password: "",
  };
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(formList);
  const [error, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { t: langTrans } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prevPassData) => ({ ...prevPassData, [name]: value }));
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(changePasswordAction(formData));
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.old_password) {
      errors.old_password = langTrans("Old password required");
    }
    if (!formData.password) {
      errors.password = "New password is required";
    }
    if (!formData.conf_password) {
      errors.conf_password = "Confirm new password";
    } else if (!isValidPassword(formData.password))
      errors.password =
        "Password should not be less than 8 characters, with at least a symbol, upper and lower case letters and a number";
    else if (formData.password != formData.conf_password)
      errors.mismatch = "Password mismatch";
    return errors;
  };

  const handleForgotPassword = () => {
    dispatch(
      forgotPasswordAction({
        EMAIL_ID: email,
      })
    );
  };

  useEffect(() => {
    if (changePasswordData?.status == 200) {
      setSuccessMessage(changePasswordData?.title);
      setTimeout(() => {
        dispatch({ type: RESET_CHANGE_PASSWORD });
        setSuccessMessage("");
        setIsChangePassword(false);
      }, 3000);
    } else if (
      changePasswordData?.status == 400 ||
      changePasswordData?.status == 404
    ) {
      setApiError(changePasswordData.title);
      setTimeout(() => {
        dispatch({ type: RESET_CHANGE_PASSWORD });
        setApiError("");
      }, 3000);
    }
  }, [changePasswordData]);

  useEffect(() => {
    if (forgotPasswordData?.status == 200) {
      setSuccessMessage(forgotPasswordData?.detail?.message);
      setTimeout(() => {
        dispatch({ type: RESET_FORGOT_PASSWORD });
        setSuccessMessage("");
      }, 3000);
    } else if (
      forgotPasswordData?.status == 400 ||
      forgotPasswordData?.status == 404
    ) {
      setApiError(forgotPasswordData.title);
      setTimeout(() => {
        dispatch({ type: RESET_FORGOT_PASSWORD });
        setApiError("");
      }, 3000);
    }
  }, [forgotPasswordData]);

  return (
    <div className={styles.changePasswordDv}>
      <figure>
        <Image src={lock} alt="" />
      </figure>
      <h2>Create password</h2>
      <p>
        Creating a password allows you to log in with your dummy classroom
        username and password.
      </p>
      <form onSubmit={handleSubmitButton}>
        <ul>
          <li>
            <InputFields
              eye
              label="Old password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
            />
            <ErrorBox title={error?.old_password} />
            <ButtonLink
              onClick={handleForgotPassword}
              icon={{ src: info, align: "right" }}
              size="small"
              title="Forgot your old password"
            />
          </li>
          <li>
            <InputFields
              eye
              label="New password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <ErrorBox title={error?.password} />
          </li>
          <li>
            <InputFields
              eye
              label="Confirm new password"
              name="conf_password"
              value={formData.conf_password}
              onChange={handleChange}
            />
            <ErrorBox title={error?.conf_password} />
            <ErrorBox title={error?.mismatch} />
          </li>
          {apiError?.length > 0 && <ErrorBox title={apiError} />}
          <SuccessBox title={successMessage} />
          <li className={styles.centerBox}>
            <ButtonGlobal
              type="submit"
              title="Submit"
              width="auto"
              disable={successMessage?.length > 0}
            />
          </li>
        </ul>
      </form>
    </div>
  );
}

export default ChangePassword;
