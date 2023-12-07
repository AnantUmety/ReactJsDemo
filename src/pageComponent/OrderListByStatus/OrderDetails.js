import React, { useState, useEffect, Fragment } from "react";
import styles from "../SchoolDetails/schoolDeatil.module.scss";
import Image from "next/image";
import scl from "../../../public/images/logistics/scl.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import { HeadingBox, Tooltip } from "@/component/Assets/Elements";
import ModalGlobal from "@/component/ModalGlobal";
import LeaveComment from "../SchoolDetails/LeaveComment";

const OrderDetails = () => {
  const [isComment, setIsComment] = useState(false);

  return (
    <Fragment>
      <div className={styles.schoolDetailsCenter}>
        <div className={styles.schoolDetailsLeft}>
          <section className={styles.scDetImg}>
            <label>
              <Image src={scl} alt="" />
            </label>
            <h4>
              <b>Order: VLPL-20230822-3313</b>
              <i>Venus public school</i>
              <span>Anand Nagar, Gwalior</span>
            </h4>
            {/* <ButtonGlobal
              onClick={() => setIsComment(!isComment)}
              width="auto"
              title="Approve"
              bgColor="green"
            /> */}
          </section>

       
            <HeadingBox className={styles.licInf} title="License information" />
    
  

          <section className={styles.platformCntr}>
            <h4>
              Platform <cite></cite>{" "}
              <ButtonGlobal greenRadius title="Active" width="auto" />
            </h4>
            <ul>
              <li>
                <b>ID </b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  PP-990030695
                </Tooltip>
              </li>
              <li>
                <b>No. of users</b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  10
                </Tooltip>
              </li>
              <li>
                <b>Start date</b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  23-Feb-2023
                </Tooltip>
              </li>
              <li>
                <b>Expiration Date</b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  23-Feb-2024
                </Tooltip>
              </li>
              <li>
                <b>Analytics</b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  Yes
                </Tooltip>
              </li>
              <li>
                <b>Invite</b>
                <Tooltip text="Grade 6 (CBSE), Grade 7 (CBSE), Grade 8 (CBSE) Grade 10 (CBSE)">
                  Yes
                </Tooltip>
              </li>
            </ul>
            <ul>
              <li>
                <b>Self Study </b> <span>Yes</span>
              </li>
              <li>
                <b>SignUp</b>
                <span>Yes</span>
              </li>
              <li>
                <b>MDM</b>
                <span>Yes</span>
              </li>
              <li>
                <b>Cloud Content</b>
                <span>Yes</span>
              </li>
              <li>
                <b>Professional Development</b>
                <span>Yes</span>
              </li>
            </ul>
          </section>
          <section className={styles.platformCntr}>
            <h4 className={styles.grayBtn}>
              Content <cite></cite>{" "}
              <ButtonGlobal greenRadius title="Active" width="auto" />
            </h4>
            <ul>
              <li>
                <b>ID </b> <span>PP-990030695</span>
              </li>
              <li>
                <b>No. of users</b>
                <span>10</span>
              </li>
              <li>
                <b>Start date</b>
                <span>23-Feb-2023</span>
              </li>
              <li>
                <b>Expiration Date</b>
                <span>23-Feb-2024</span>
              </li>
              <li>
                <b>Analytics</b>
                <span>Yes</span>
              </li>
              <li>
                <b>Invite</b>
                <span>Yes</span>
              </li>
            </ul>
            <ul>
              <li>
                <b>Self Study </b> <span>Yes</span>
              </li>
              <li>
                <b>SignUp</b>
                <span>Yes</span>
              </li>
              <li>
                <b>MDM</b>
                <span>Yes</span>
              </li>
              <li>
                <b>Cloud Content</b>
                <span>Yes</span>
              </li>
              <li>
                <b>Professional Development</b>
                <span>Yes</span>
              </li>
            </ul>
          </section>
        </div>

        <div className={styles.schoolDetailsRight}>
          <section>
            <h2>About school admin</h2>
            <ul>
              <li>
                <b>Account ID </b> 741-603-215
              </li>
              <li>
                <b>Admin name</b>Vivek Gupta
              </li>
              <li>
                <b>Admin phone</b>+91 - 1234567890
              </li>
              <li>
                <b>Admin email</b>demomail@email.com
              </li>
            </ul>
          </section>



          <section>
            <h2>Support team</h2>
            <ul>
              <li>
                <b>Reseller</b> Reseller name
              </li>
              <li>
                <b>Reseller email</b>jaingagan@mail.com
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

export default OrderDetails;
