import React from "react";
import PropTypes from "prop-types";
import styles from "../SchoolDetails/schoolDeatil.module.scss";
import illustration from "../../../public/images/global/illustration.png";
import Image from "next/image";
import InputFields from "@/component/inputFields/InputFields";
import ButtonGlobal from "@/component/ButtonGlobal";
function OrderComment({ comment }) {
  return (
    <div className={styles.leaveCommentDiv}>
      <label>
        <Image src={illustration} alt="" />
      </label>
      <InputFields
        className={styles.textClass}
        fieldname="textarea"
        value={comment}
      />
    </div>
  );
}

OrderComment.propTypes = {};

export default OrderComment;
