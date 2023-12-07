import { Logo } from "@/component/Assets/Library";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import styles from "./sidebar.module.scss";
import classnames from "classnames";
import { useRouter } from "next/router";
import { logoutAction } from "@/redux/action/logoutAction";
import { useDispatch } from "react-redux";

const Sidebar = ({ blueBird, fixed, data, darkBlue }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div
        data-attr="sidebarCntr"
        className={classnames({
          [styles.sidebarCntr]: true,
          [styles.sidebarCntrOuter]: true,
          [styles.darkBlue]: darkBlue,
          [styles.fixed]: fixed,
        })}
      >
        {!darkBlue && (
          <>
            <div className={styles.topHead}></div>
            <div className={styles.bottomHead}></div>
          </>
        )}
        <main>
          <hgroup>
            <Logo />
          </hgroup>
          <ul>
            {data &&
              data?.map((item, ind) => {
                return (
                  <React.Fragment key={ind}>
                    {item?.url != "logout" ? (
                      <li className={item?.move && styles.moveTop}>
                        <Link
                          href={item?.url}
                          className={
                            item?.url === router.pathname && styles.activated
                          }
                        >
                          <b>
                            <Image src={item?.icon} alt="" />
                          </b>{" "}
                          <span>{item?.title}</span>
                        </Link>
                      </li>
                    ) : (
                      <li key={`button_${ind}`}>
                        <button
                        // onClick={() => {
                        //   dispatch(logoutAction());
                        // }}
                        >
                          <b>
                            <Image
                            style={{
                              objectFit: "cover",
                              borderRadius: "16px", //👈 and here you can select border radius
                            }}
                  
                              src={item?.icon}
                              width={28}
                              height={28}
                              alt=""
                            />
                          </b>{" "}
                          <span title={item?.title}>{item?.title}</span>
                          <em
                            onClick={() => {
                              dispatch(logoutAction());
                            }}
                          ></em>
                        </button>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
          </ul>
        </main>
      </div>
    </Fragment>
  );
};

export default Sidebar;
