import ButtonGlobal from "@/component/ButtonGlobal";
import InputFields from "@/component/inputFields/InputFields";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import styles from "./order.module.scss";
import { approveOrderAction } from "@/redux/action/approveOrderAction";
import {useDispatch } from "react-redux";

function ApprovedBox({ setIsApproved, isApprovedData, refreshData }) {

  let statusDataGet =
    isApprovedData?.financeStatus?.toLowerCase() == "approved"
      ? "A"
      : isApprovedData?.financeStatus?.toLowerCase() == "pending"
      ? "P"
      : "D";

  const [isStatus, setIsStatus] = useState(statusDataGet);
  const [isMessage, setIsMessage] = useState("");
  const dispatch = useDispatch();
  const statusHandler = (id) => {
    setIsStatus(id);
  };

  const handleSubmit = () => {
    dispatch(
      approveOrderAction({
        status: isStatus,
        comment: isMessage,
        orgOrderId: isApprovedData?.orgOrderId,
      })
    )
      .then((result) => {
        console.log("Action completed successfully:", result);
        setIsApproved(false);
        refreshData()
      })
      .catch((error) => {
        console.log("Error in action:", error);
        setIsApproved(false);
      });
  };

  return (
    <Grid container className={styles.approvBoxs}>
      <Grid item xs={12}>
        <div className={styles.checkLists}>
          <p>Select Finance Status an option:</p>
          <aside>
            <button
              className={isStatus === "A" && styles.actives}
              onClick={() => statusHandler("A")}
            >
              <b></b>Approve
            </button>
            <button
              className={isStatus === "D" && styles.actives}
              onClick={() => statusHandler("D")}
            >
              <b></b>Denied
            </button>
          </aside>
        </div>
        <InputFields
          placeholder="Enter approval message"
          onChange={(e) => setIsMessage(e.target.value)}
        />
        <ButtonGlobal
          onClick={() => handleSubmit()}
          disable={(isMessage.length <= 2 || isStatus == "P")}
          title="Send"
          width="auto"
        />
      </Grid>
    </Grid>
  );
}

export default ApprovedBox;
