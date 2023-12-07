import ButtonGlobal from "@/component/ButtonGlobal";
import InputFields from "@/component/inputFields/InputFields";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Loginbtns from "./Loginbtns";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  ErrorBox,
  ErrorBoxRed,
  SuccessBox,
} from "@/component/MessageBox/MessageBox";
import { setPasswordAction } from "@/redux/action/setPasswordAction";

export default function SetPassword({ userId }) {
  const dispatch = useDispatch();
  const { t: langTrans } = useTranslation();
  const router = useRouter();
  const formList = {
    password: "",
    confirmPassword: "",
    userSid: userId,
  };
  const [formData, setFormData] = useState(formList);
  const [error, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState(false);

  const { setPassword } = useSelector((state) => {
    return {
      setPassword: state?.setPassword?.setPassword,
    };
  });

  useEffect(() => {
    if (setPassword.status == 200) {
      setApiSuccess(true);
      setTimeout(() => {
        router.reload();
      }, 3000);
    }
  }, [setPassword]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);
      dispatch(
        setPasswordAction({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          userSid: userId,
        })
      );
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.password) {
      errors.password = langTrans("error.passwordRequired");
    } else if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password != formData.confirmPassword)
      errors.confirmPassword = "Password mismatch";
    return errors;
  };

  return (
    <div className={styles.loginUsercntr}>
      <ul>
        <li>
          <InputFields
            name="password"
            placeholder={langTrans("login.password")}
            onChange={handleChange}
            eye
          />
          <ErrorBox title={error?.password} />
        </li>
        <li>
          <InputFields
            name="confirmPassword"
            placeholder={"Confirm password"}
            onChange={handleChange}
            eye
          />
          <ErrorBox title={error?.confirmPassword} />
        </li>
        {apiSuccess && (
          <li>
            <SuccessBox title="Password changed successfully. Please login again. " />
          </li>
        )}

        <li>
          <ButtonGlobal
            disable={isProcessing}
            onClick={handleSubmitButton}
            title={isProcessing ? "Processing" : "Login"}
          />
        </li>
      </ul>
    </div>
  );
}
