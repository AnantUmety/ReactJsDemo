import React, { useState, useEffect } from "react";
import styles from "./setPasswordPage.module.scss";
import Image from "next/image";
import { TextField } from "@mui/material";
import lock from "../../../public/images/global/lock.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import { WhiteBox } from "@/component/Assets/Elements";
import { useSelector, useDispatch } from "react-redux";
import { setPasswordAction } from "@/redux/action/setPasswordAction";
import { isValidPassword } from "@/utils/validation";
import { ErrorBox, SuccessBox } from "@/component/MessageBox/MessageBox";
import InputFields from "@/component/inputFields/InputFields";
import { useRouter } from "next/router";

function SetPasswordPage({ userId }) {
  const { setPasswordData } = useSelector((state) => {
    return {
      setPasswordData: state?.setPassword?.setPassword,
    };
  });
  const router = useRouter();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
    setFormData((prevPassData) => ({ ...prevPassData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        setPasswordAction({
          login_id: formData.username,
          activation_key: userId,
          password: formData.newpassword,
        })
      );
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.newpassword) {
      errors.newpassword = "New password is required";
    } else if (!isValidPassword(formData.newpassword))
      errors.newpassword =
        "Password should not be less than 8 characters, with at least a symbol, upper and lower case letters and a number";
    if (!formData.confirmpassword) {
      errors.confirmpassword = "Confirm new password";
    } else if (formData.newpassword != formData.confirmpassword)
      errors.mismatch = "Password mismatch";
    return errors;
  };

  useEffect(() => {
    if (setPasswordData?.status == 200) {
      setSuccessMessage("Your password has been updated successfully. Please login.");
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/");
      }, 4000);
    } else if (
      setPasswordData?.status == 400 ||
      setPasswordData?.status == 404
    ) {
      setApiError(setPasswordData.message);
      setTimeout(() => {
        setApiError("");
      }, 3000);
    }
  }, [setPasswordData]);

  return (
    <div className={styles.setPasswordDv}>
      <WhiteBox>
        <figure>
          <Image src={lock} alt="" />
        </figure>
        <h2>Create password</h2>
        <p>
          Creating a password allows you to log in with your dummy classroom
          username and password.
        </p>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <TextField
                label="Username"
                name="username"
                variant="filled"
                fullWidth
                type="text"
                className="customeFields"
                value={formData.username}
                onChange={handleChange}
              />
              <ErrorBox title={error?.username} />
            </li>
            <li>
              <InputFields
                placeholder="New password"
                name="newpassword"
                eye
                value={formData.newpassword}
                onChange={handleChange}
              />
              <ErrorBox title={error?.newpassword} />
            </li>
            <li>
              <InputFields
                placeholder="Confirm new password"
                name="confirmpassword"
                eye
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <ErrorBox title={error?.confirmpassword} />
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
      </WhiteBox>
    </div>
  );
}

export default SetPasswordPage;
