import React, { useState, useEffect, Fragment, useRef } from "react";
import styles from "./orderDetail.module.scss";
import Image from "next/image";
import scl from "../../../public/images/logistics/scl.png";
import { HeadingBox } from "@/component/Assets/Elements";
import dynamic from "next/dynamic";
import ModalGlobal from "@/component/ModalGlobal";
import LeaveComment from "./LeaveComment";
import Link from "next/link";
import pdfDoc from "../../../public/images/global/pdfDoc.svg";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetailByIDAction } from "@/redux/action/getOrderDetailByIDAction";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SchoolDetails = ({ orderId = -1 }) => {
  const dispatch = useDispatch();
  const [isComment, setIsComment] = useState(false);
  const [schoolData, setSchoolData] = useState({});

  const { schoolDetail } = useSelector((state) => {
    return {
      schoolDetail: state?.orderData?.orderDetail,
    };
  });

  useEffect(() => {
    if (schoolDetail) {
      setSchoolData(schoolDetail);
    }
  }, [schoolDetail]);

  useEffect(() => {
    if (orderId != -1) {
      dispatch(getOrderDetailByIDAction(orderId));
    }
  }, [orderId]);

  const LicenseDataList = ({}) => {
    return (
      <section className={styles.platformCntr}>
        <h4>{schoolDetail?.skuName}</h4>
        <h4>{schoolDetail?.skuDesc}</h4>
        <ul>
          <li>
            <b>Curriculum Name </b>
            {schoolDetail?.curriculumName}
          </li>

          <li>
            <b>No. of devices</b>
            {schoolDetail?.noOfDevice}
          </li>
          <li>
            <b>Validity (in days)</b>
            {schoolDetail?.validity}
          </li>
          <li>
            <b>Professional Development</b>
            {schoolDetail?.isPd == "Y" ? "Yes" : "No"}
          </li>
        </ul>

        <ul>
          <li>
            <b>Self Study </b>
            <span>{schoolDetail?.isSelfStudy == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>SignUp</b>
            <span>{schoolDetail?.isSignUp == "Y" ? "Yes" : "No"}</span>
          </li>
          <li>
            <b>VR Lab</b>
            <span>{schoolDetail?.isVrLab == "Y" ? "Yes" : "No"}</span>
          </li>
        </ul>
      </section>
    );
  };

  return (
    <Fragment>
     
        <div className={styles.schoolDetailsCenter}>
          <div className={styles.schoolDetailsLeft}>
            <section className={styles.scDetImg}>
              <label>
                <Image src={scl} alt="" />
              </label>
              <h4>
                <i>{schoolData.orderNo}</i>
                <i>{schoolData.orgName}</i>
                <span>
                  {schoolData.orgAddress} , {schoolData.countryName}
                </span>
              </h4>
              {/* <ButtonGlobal
                onClick={() => setIsComment(!isComment)}
                width="auto"
                title="Approve"
                bgColor="green"
              /> */}
            </section>

            <section className={`${styles.showCartDiv} ${styles.showCartDivUpps}`}>
              <aside>
                <HeadingBox width="auto" title="License information" />
              </aside>
            </section>
            <LicenseDataList licenceFrom={new Date()} />
          </div>

          <div className={`${styles.schoolDetailsRight}`}>
            <section>
              <div className={styles.aboutSchoolDv}>
                <h2>About school</h2>
              </div>
              <ul>
                <li>
                  <b>School name </b>
                  {schoolData.orgName}
                </li>
                <li>
                  <b>Admin name</b>
                  {schoolData.firstName} {schoolData.lastName}
                </li>
                <li>
                  <b>Admin phone</b>
                  {schoolData.phoneNo}
                </li>
                <li>
                  <b>Admin email</b>
                  {schoolData.phoneNo}
                </li>

                <li>
                  <b>Country</b>
                  {schoolData.countryName}
                </li>
              </ul>
            </section>

            {schoolData.agreementDoc && (
              <section>
                <h2>Supported documents</h2>
                <Link href={schoolData.agreementDoc} legacyBehavior>
                  <a
                    className={styles.pdfDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={pdfDoc} width={32} height={32} alt="" />
                    <span>
                      <b>Uploaded by reseller</b>
                    </span>
                  </a>
                </Link>
              </section>
            )}
            <section>
              <h2>Support team</h2>
              <ul>
                <li>
                  <b>Reseller</b>
                  {schoolData.resellerFirstName} {schoolData.resellerLastName}
                </li>
                <li>
                  <b>Reseller email</b>
                  {schoolData.resellerEmail}
                </li>
              </ul>
            </section>
          </div>
        </div>
     
      {isComment && (
        <ModalGlobal activeState={isComment} onClick={setIsComment}>
          <LeaveComment />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

export default SchoolDetails;
