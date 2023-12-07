import { WhiteBox } from "@/component/Assets/Elements";
import { Logo } from "@/component/Assets/Library";
import React, { useEffect } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import IconsLogin from "./IconsLogin";
import LoginSchool from "./LoginSchool";
import { useState } from "react";
import user from "../../../public/images/preLogin/user.png";
import school from "../../../public/images/preLogin/school.png";
import home from "../../../public/images/preLogin/home.png";
import LoginUser from "./LoginUser";
import { useDispatch } from "react-redux";
import { useTranslation } from "next-i18next";
import ForgotPassword from "../Forgotpassword/ForgotPassword";

export const Login = () => {
  const { t: langTrans } = useTranslation();
  const [isSchoolLogin, setIsSchoolLogin] = useState(false);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!showForgotPassword)
      dispatch({ type: "RESET_FORGOT_PASSWORD", payload: {} });
  }, [showForgotPassword]);
  return (
    <div className={styles.loginCntr}>
      {!showForgotPassword && (
        <>
          {" "}
          <Logo />
          <WhiteBox>
            {!isSchoolLogin && <IconsLogin src={user} />}

            {isSchoolLogin && !isSchoolSelected && <IconsLogin src={home} />}

            {isSchoolLogin && isSchoolSelected && (
              <IconsLogin
                src={school}
                title="Demo School"
                link={{ title: "d", url: "" }}
              />
            )}
            {isSchoolLogin && !isSchoolSelected && (
              <LoginSchool setIsSchoolSelected={setIsSchoolSelected} />
            )}

            {((isSchoolLogin && isSchoolSelected) || !isSchoolLogin) && (
              <LoginUser
                isSchoolLogin={isSchoolLogin}
                setShowForgotPassword={setShowForgotPassword}
              />
            )}

            {isSchoolLogin && isSchoolSelected && (
              <h4>
                {langTrans("login.dontHaveAccount")}{" "}
                <Link href="/signup">{langTrans("signup.signup")}</Link>
              </h4>
            )}

            <h6>
              {langTrans("login.confirmYouRead")}{" "}
              <Link href="">{langTrans("login.termsOfUse")}</Link>{" "}
              {langTrans("login.and")}{" "}
              <Link href="">{langTrans("login.privacyPolicy")}</Link>
            </h6>
            {/* <h5>
              <Link
                href=""
                onClick={() => {
                  setIsSchoolLogin(!isSchoolLogin);
                }}
              >
                {isSchoolLogin
                  ? langTrans("login.partnerLogin")
                  : langTrans("login.schoolLogin")}
              </Link>
            </h5> */}
          </WhiteBox>
        </>
      )}
      {showForgotPassword && (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      )}
    </div>
  );
};
