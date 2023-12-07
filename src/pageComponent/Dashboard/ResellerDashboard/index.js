import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../LogisticDashboard/logDash.module.scss";
import { DashboardColoredBoxs, HeadingBox, SkeletonLoading, SkeletonNotFound } from "@/component/Assets/Elements";
import school from "../../../../public/images/logistics/school.png";
import order from "../../../../public/images/logistics/order.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import { Grid } from "@mui/material";
import Table from "@/component/Table";
import { Actions } from "@/component/Table/Actions";
import Link from "next/link";
import comment from "../../../../public/images/global/comment.png";
import Image from "next/image";
import { getOrderListingAction } from "@/redux/action/getOrderListingAction";
import { useSelector, useDispatch } from "react-redux";
import { resellerDashhboardAction } from "@/redux/action/resellerDashhboardAction";
import { Status } from "@/component/Table/Status";
import ModalGlobal from "@/component/ModalGlobal";
import OrderComment from "@/pageComponent/Order/OrderComment";
import { RESET_ADD_ORGANIZATION } from "@/redux/constants";

function ResellerDashboard() {
  const dispatch = useDispatch();
  const [schoolData, setSchoolData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [financeCommentText, setFinanceCommentText] = useState("");
  const [isComment, setIsComment] = useState(false);
  let hitApi = false;

  const [orders, setOrders] = useState([]);
  const { resellerCounts, orderList } = useSelector((state) => {
    return {
      resellerCounts: state?.dashboard?.resellerCounts,
      orderList: state?.orderData?.orderList?.rows,
    };
  });

  useEffect(() => {
    if (orderList && orderList.length > 0 && orders?.length == 0) {
      setOrders(orderList);
    }
  }, [orderList]);

  useEffect(() => {
    if (!hitApi) {
      dispatch(resellerDashhboardAction());
      dispatch(getOrderListingAction("", 10, 1, "", true));
      dispatch({ type: RESET_ADD_ORGANIZATION });
      hitApi = true;
    }
  }, [dispatch]);
  useEffect(() => {
    if (resellerCounts?.status == 200 && resellerCounts?.detail) {
      let school = [
        {
          title: "Total",
          count: resellerCounts?.detail?.totalSchool,
          url: "/auth/schools/total",
        },
        {
          title: "Expiring",
          count: resellerCounts?.detail?.expiringSchool,
          url: "/auth/schools/expiring",
        },
        {
          title: "Pending",
          count: resellerCounts?.detail?.pendingSchool,
          url: "/auth/schools/pending",
        },
      ];

      let order = [
        {
          title: "Approved",
          count: resellerCounts?.detail?.approvedOrder,
          url: "/auth/order/approved",
        },
        {
          title: "Pending",
          count: resellerCounts?.detail?.pendingOrder,
          url: "/auth/order/pending",
        },
      ];

      setSchoolData(school);
      setOrderData(order);
    }
  }, [resellerCounts]);

  const countryOrders = [
    { title: "India", value: "1000" },
    { title: "USA", value: "600" },
    { title: "Singapore", value: "400" },
  ];
  const totalValue = countryOrders.reduce((count, order) => {
    return count + parseInt(order?.value);
  }, 0);

  const commentHandler = (financeComment) => {
    setFinanceCommentText(financeComment);
    setIsComment(!isComment);
  };

  const columns = [
    {
      Header: "Order ID",
      accessor: "orderNumber",
      Cell: ({ row }) => (
        <a href={`/auth/order-details/${row.original.orgOrderId}`}>
          {row.original.orderNumber}
        </a>
      ),
    },
    {
      Header: "School name",
      accessor: "orgName",
    },
    {
      Header: "Email ID",
      accessor: "emailId",
    },
    {
      Header: "Mobile",
      accessor: "phoneNo",
    },
    {
      Header: "Reseller",
      accessor: "resellerFirstName",
      arrow: true,
      Cell: (cellInfo) => {
        const { row } = cellInfo;
        const fullName = `${row.original.resellerFirstName} ${row.original.resellerLastName}`;
        return <>{fullName}</>;
      },
    },
    {
      Header: "Finance status",
      accessor: "financeStatus",
      Cell: (props) => {
        return (
          <>
            <Status
              status={
                props.cell.value == "APPROVED"
                  ? "Approved"
                  : props.cell.value == "PENDING"
                  ? "Pending"
                  : "Denied"
              }
            />
            {props.cell.row.original.financeComment && (
              <button
                className={styles.commented}
                onClick={() =>
                  commentHandler(props.cell.row.original.financeComment)
                }
              >
                <Image src={comment} alt="" />
              </button>
            )}
          </>
        );
      },
      arrow: true,
    },
    {
      Header: "Order Status",
      accessor: "orderStatus",
      Cell: (props) => {
        return (
          <Status
            status={
              props.cell.value == "APPROVED"
                ? "Approved"
                : props.cell.value == "PENDING"
                ? "Pending"
                : "Denied"
            }
          />
        );
      },
      arrow: true,
    },
  ];

  return (
    <div styles={styles.aa}>
      {orders ? <>
      <HeadingBox title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={6} className={styles.dashFlex}>
         {(schoolData.length > 0) ? 
         <DashboardColoredBoxs
            bgColor="lightYellow"
            heading="Schools"
            subTitle={63}
            data={schoolData}
            icon={school}
          /> :  <SkeletonNotFound marginBottom="20px" count={4} /> }
        </Grid>

        <Grid item xs={6} className={styles.dashFlex}>
        {(orderData.length > 0) ? <DashboardColoredBoxs
            bgColor="lightBlue"
            heading="Orders"
            subTitle={63}
            data={orderData}
            icon={order}
          /> :  <SkeletonNotFound marginBottom="20px" count={4} /> }
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeadingBox title="Latest orders" />
          {(orders.length > 0) ? <Table data={orders} columns={columns} limit={20} search={true} /> : <SkeletonNotFound /> }
        </Grid>
      </Grid>
      </>
      :
      <SkeletonNotFound />}
     

      {isComment && (
        <ModalGlobal activeState={isComment} onClick={setIsComment}>
          <OrderComment comment={financeCommentText} />
        </ModalGlobal>
      )}
    </div>
  );
}

ResellerDashboard.propTypes = {};

export default ResellerDashboard;
