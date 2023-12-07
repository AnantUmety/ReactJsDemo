import React, { useEffect, useState } from "react";
import styles from "./partnermenu.module.scss";
import { FooterSecondry } from "@/component/Footer";
import classnames from "classnames";
import { deleteAllCookies } from "@/utils/cookies";
import Sidebar from "@/component/Layout/Sidebar";
import { getUserNavigationMenu } from "@/utils/getUserNavigationMenu";

const PartnerMenu = ({ children, flex, className }) => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    setMenuData(getUserNavigationMenu());
  }, []);


  return (
    <div
      className={classnames({
        [styles.logisticCntr]: true,
        [className]: className,
        [styles[flex]]: flex,
      })}
    >
      <Sidebar darkBlue data={menuData} />
      <div
        className={classnames({
          [styles.logisticCntrRight]: true,
          [className]: className,
          [styles[flex]]: flex,
        })}
      >
        {children}
      </div>

      <div data-attr="footerSecDiv" className={styles.footerSecDiv}></div>
      <FooterSecondry />
    </div>
  );
};

export default PartnerMenu;
