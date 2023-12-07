import ButtonGlobal from "@/component/ButtonGlobal";
import InputFields from "@/component/inputFields/InputFields";
import { useEffect, useState } from "react";
import styles from "./login.module.scss";
import Loginbtns from "./Loginbtns";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getSession, signIn } from "next-auth/react";
import { getCookie, setCookie } from "@/utils/cookies";
import { useSelector, useDispatch } from "react-redux";
import CryptoJS from "crypto-js";
import {
  IS_USER_LOGGED_IN,
  USER_TYPE,
  USER_FULL_NAME,
  USER_SID,
  USER_LOGISTIC,
  USER_RESELLER,
  REMEMBER_ME,
  ENCRYPTED_USERNAME,
  ENCRYPTED_PASSWORD,
  RESELLER_ID,
  USER_LOGISTIC_MANAGER,
  PATH_LOGISTIC_DASHBOARD,
  PATH_RESELLER_DASHBOARD,
  USER_PROFILE_PHOTO,
  USER_FINANCE,
  PATH_FINACE_ORDER,
} from "@/redux/constants";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import { getUserInfoAction } from "@/redux/action/getUserInfoAction";
import SetPassword from "./SetPassword";
import { ParentBox } from "@/component/Assets/Library";
import { ButtonLink, CheckboxButton } from "@/component/Assets/Elements";

export default function LoginUser({ setShowForgotPassword, isSchoolLogin }) {
  const dispatch = useDispatch();
  const { t: langTrans } = useTranslation();
  const router = useRouter();
  const formList = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(formList);
  const [error, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [setPassword, setSetPassword] = useState(false);
  const [userIdToSetPassword, setUserIdToSetPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [rememberMe, setRememberMe] = useState(getCookie(REMEMBER_ME));

  const { userAttribute } = useSelector((state) => {
    return {
      userAttribute: state?.userAttributeData?.userAttribute?.data,
    };
  });

  useEffect(() => {
    const remembered = getCookie(REMEMBER_ME);
    if (remembered === "true") {
      setRememberMe(true);

      const encryptedUsername = getCookie(ENCRYPTED_USERNAME);
      const encryptedPassword = getCookie(ENCRYPTED_PASSWORD);
      if (encryptedUsername && encryptedPassword) {
        const decryptedUsername = decryptData(encryptedUsername);
        const decryptedPassword = decryptData(encryptedPassword);

        setFormData({
          username: decryptedUsername,
          password: decryptedPassword,
        });
      }
    }
  }, []);

  const forgotHandler = () => {
    setShowForgotPassword(true);
  };

  useEffect(() => {
    if (userAttribute?.USER_OID) {
      setCookie(
        USER_FULL_NAME,
        userAttribute.FIRST_NAME + " " + userAttribute.LAST_NAME,
        ""
      );

      setCookie(USER_SID, userAttribute.USER_OID, "");
      setCookie(USER_TYPE, userAttribute.UT_DEF, "");
      setCookie(USER_PROFILE_PHOTO, userAttribute.PROFILE_PHOTO, "");
      if (userAttribute.UT_DEF == USER_RESELLER)
        setCookie(RESELLER_ID, userAttribute.RESELLER_ID, "");
      switch (userAttribute.UT_DEF) {
        case USER_LOGISTIC:
        case USER_LOGISTIC_MANAGER:
          router.push(PATH_LOGISTIC_DASHBOARD);
          break;

        case USER_RESELLER:
          router.push(PATH_RESELLER_DASHBOARD);
          break;

        case USER_FINANCE:
          router.push(PATH_FINACE_ORDER);
          break;

        default:
          break;
      }
    }
  }, [userAttribute]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneNumberRegex = /^\d{10}$/;
      const emailOrPhoneValid =
        emailRegex.test(value) || phoneNumberRegex.test(value);
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), "dummy").toString();
  };

  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, "dummy");
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    if (!isSchoolLogin)
      if (Object.keys(validationErrors).length === 0) {
        if (rememberMe) {
          const encryptedUsername = encryptData(formData.username);
          const encryptedPassword = encryptData(formData.password);
          setCookie(ENCRYPTED_USERNAME, encryptedUsername, "");
          setCookie(ENCRYPTED_PASSWORD, encryptedPassword, "");
          setCookie(REMEMBER_ME, true, "");
        } else {
          document.cookie = `${ENCRYPTED_USERNAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${ENCRYPTED_PASSWORD}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${REMEMBER_ME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        setIsProcessing(true);
        const signInResponse = await signIn("partnerLogin", {
          redirect: false,
          username: formData.username,
          password: formData.password,
        });

        if (signInResponse?.status == 200) {
          const response = await getSession();
          if (response) {
            setCookie(IS_USER_LOGGED_IN, true, "");
            localStorage.setItem(IS_USER_LOGGED_IN, true);
            dispatch(getUserInfoAction());
          }
        } else if (signInResponse?.status == 401) {
          setIsProcessing(false);
          try {
            let data = JSON.parse(signInResponse.error);
            if (data.status == 200 && data?.detail?.newPasswordRequired) {
              setUserIdToSetPassword(data.detail.userId);
              setSetPassword(data.detail.newPasswordRequired);
            } else {
              setApiError(data.message);
              setTimeout(() => {
                setApiError("");
              }, 3000);
            }
          } catch (e) {
            setApiError(signInResponse.error);
            setTimeout(() => {
              setApiError("");
            }, 3000);
          }
        }
      } else {
        setErrors(validationErrors);
      }
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.username) {
      errors.username = langTrans("error.usernameRequired");
    } else if (!formData.password) {
      errors.password = langTrans("error.passwordRequired");
    }
    return errors;
  };

  return (
    <>
      {setPassword ? (
        <SetPassword userId={userIdToSetPassword} />
      ) : (
        <div className={styles.loginUsercntr}>
          <form onSubmit={handleSubmit}>
            <ul>
              {apiError?.length > 0 && (
                <li>
                  <ErrorBox title={apiError} />
                </li>
              )}

              <li>
                <InputFields
                  value={formData.username}
                  name="username"
                  placeholder={langTrans("login.username")}
                  onChange={handleChange}
                />

                <ErrorBox title={error?.username} />
              </li>
              <li>
                <InputFields
                  value={formData.password}
                  name="password"
                  placeholder={langTrans("login.password")}
                  onChange={handleChange}
                  eye
                />
                <ErrorBox title={error?.password} />
              </li>
              <li>
                <ParentBox className={styles.checkBx}>
                  <CheckboxButton
                    className={styles.checkboxHeading}
                    label="Remember me"
                    initialValue={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <ButtonLink
                    onClick={forgotHandler}
                    title={langTrans("login.forgotText")}
                    size="small"
                  />
                </ParentBox>
              </li>
              <li>
                <ButtonGlobal
                  disable={isProcessing}
                  size="medium"
                  type="submit"
                  title={isProcessing ? "Processing" : "Login"}
                />
              </li>
            </ul>
          </form>
          {/* <h4 style={{ opacity: "0.3" }}>
            <span>{langTrans("login.orLogin")}</span>
          </h4>
          <div style={{ opacity: "0.5", pointerEvents: "none" }}>
            <Loginbtns />
          </div> */}
        </div>
      )}
    </>
  );
}
