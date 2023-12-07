import React from "react";
import PropTypes from "prop-types";
import { HeadingBox } from "@/component/Assets/Elements";
import styles from "./notification.module.scss";
import Image from "next/image";
import avatars from "../../../public/images/notification/avatars.png";
import ButtonGlobal from "@/component/ButtonGlobal";

function Notification(props) {
  return (
    <div className={styles.notificationBoxUp}>
      <HeadingBox title="Notifications" />

      <div className={styles.notificationBox}>
        <h5>Today</h5>
        <div className={`${styles.noticeBox} ${styles.noticeBoxBg}`}>
          <label>
            <Image src={avatars} alt="" />
          </label>
          <hgroup>
            <h6><b>Teacher</b> 1 invited you to join <b>final year</b>{" "}
            <span>1 hour ago</span></h6>
            <ButtonGlobal className={styles.btnLis} bgColor="red" title="Reject" width="auto" />
            <ButtonGlobal className={styles.btnLis} title="Accept" width="auto" />
          </hgroup>
        </div>

        <div className={`${styles.noticeBox} ${styles.noticeBoxBg}`}>
          <label>
            <Image src={avatars} alt="" />
          </label>
          <hgroup>
            <h6><b>Teacher</b> 1 invited you to join <b>final year</b>{" "}
            <span>1 hour ago</span></h6>
            <ButtonGlobal className={styles.btnLis} bgColor="red" title="Reject" width="auto" />
            <ButtonGlobal className={styles.btnLis} title="Accept" width="auto" />
          </hgroup>
        </div>

 

        <div className={styles.noticeBox}>
          <label>
            <Image src={avatars} alt="" />
          </label>
          <hgroup>
          <h6>You have accepted the invitation to join <b>Achiever</b> by{" "}
            <b>Chris Rollin</b> <span>6 days ago</span></h6>
          </hgroup>
        </div>
      </div>

      <div className={styles.notificationBox}>
        <h5>11 May 2023, Thursday</h5>

        <div className={styles.noticeBox}>
          <label>
            <Image src={avatars} alt="" />
          </label>
          <hgroup>
          <h6>You have accepted the invitation to join <b>Achiever</b> by{" "}
            <b>Chris Rollin</b> <span>6 days ago</span></h6>
          </hgroup>
        </div>

        <div className={styles.noticeBox}>
          <label>
            <Image src={avatars} alt="" />
          </label>
          <hgroup>
          <h6>You have accepted the invitation to join <b>Achiever</b> by{" "}
            <b>Chris Rollin</b> <span>6 days ago</span></h6>
          </hgroup>
        </div>

      </div>
    </div>
  );
}

Notification.propTypes = {};

export default Notification;
