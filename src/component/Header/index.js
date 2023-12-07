import { useEffect, useState, useRef, Fragment } from "react";
import styles from "./header.module.scss";
import classnames from "classnames";
import {
  Logo,
  BrowseLibrary,
  useResponsiveBreakpoints,
  UseLanguageSelector,
} from "@/component/Assets/Library";
import ButtonGlobal from "../ButtonGlobal";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { getCookie } from "@/utils/cookies";
import { IS_USER_LOGGED_IN } from "@/redux/constants";
import { logoutAction } from "@/redux/action/logoutAction";
import { useSelector, useDispatch } from "react-redux";

export const Header = ({
  small = "",
  className = "",
  size = "",
  onlyLogo,
  absolute,
}) => {
  const { isMobileDown, isMobileUp, isTabletDown, isTabletUp, isDesktop } =
    useResponsiveBreakpoints();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t: langTrans } = useTranslation();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <nav
      className={classnames({
        [styles.headerCntr]: true,
        [className]: className,
        [styles[size]]: size,
        [styles.absolute]: absolute,
      })}
    >
      <Logo />
      {!onlyLogo && (
        <>
          {isTabletUp && size === "medium" ? (
            <Fragment>
              <UseLanguageSelector />
              <BrowseLibrary />
            </Fragment>
          ) : (
            <Fragment>
              <UseLanguageSelector />
              {/* getCookie(IS_USER_LOGGED_IN) */}
              {localStorage.getItem(IS_USER_LOGGED_IN) ? (
                <ButtonGlobal
                  className={styles.loginBtnHead}
                  width="auto"
                  title={langTrans("login.logoutBtn")}
                  onClick={() => handleLogoutClick()}
                />
              ) : (
                <ButtonGlobal
                  className={styles.loginBtnHead}
                  width="auto"
                  title={langTrans("login.loginBtn")}
                  onClick={() => router.push("/login")}
                />
              )}
            </Fragment>
          )}
        </>
      )}
    </nav>
  );
};

export default Header;

// className want to custiomize css to use
// size='medium' to manage header container
// onlyLogo to show only logo
