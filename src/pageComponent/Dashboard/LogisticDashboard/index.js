import { useEffect, useState } from "react";
import styles from "./logDash.module.scss";
import {
  DashboardColoredBoxs,
  HeadingBox,
  SkeletonLoading,
  SkeletonNotFound,
} from "@/component/Assets/Elements";
import relseller from "../../../../public/images/logistics/relseller.png";
import school from "../../../../public/images/logistics/school.png";
import order from "../../../../public/images/logistics/order.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import { Grid } from "@mui/material";
import Table from "@/component/Table";
import { Actions } from "@/component/Table/Actions";
import comment from "../../../../public/images/global/comment.png";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logisticDashhboardAction } from "@/redux/action/logisticDashhboardAction";
import { getOrderListingAction } from "@/redux/action/getOrderListingAction";
import { Status } from "@/component/Table/Status";
import ModalGlobal from "@/component/ModalGlobal";
import OrderComment from "@/pageComponent/Order/OrderComment";
import { useRouter } from "next/router";
function LogisticDashboard(props) {
  const dispatch = useDispatch();
  const [countData, setCountData] = useState({});
  const [financeCommentText, setFinanceCommentText] = useState("");
  const [isComment, setIsComment] = useState(false);
  const router = useRouter();
  const [totalCountryCount, setTotalCountryCount] = useState(-1);
  const [topSellingCountry, setTopSellingCountry] = useState([]);

  let hitApi = false;

  const [orders, setOrders] = useState([]);
  const { logisticCounts, orderList } = useSelector((state) => {
    return {
      logisticCounts: state?.dashboard?.logisticCounts,
      orderList: state?.orderData?.orderList?.rows,
    };
  });

  useEffect(() => {
    if (orderList && orderList.length > 0 && orders?.length == 0) {
      setOrders(orderList);
    }
  }, [orderList]);

  const countryOrder = [
    { title: "India", value: "1000" },
    { title: "USA", value: "600" },
    { title: "Singapore", value: "400" },
  ];

  useEffect(() => {
    if (!hitApi) {
      dispatch(logisticDashhboardAction());
      dispatch(getOrderListingAction("", 10, 1, "", true));
      hitApi = true;
    }
  }, [dispatch]);

  useEffect(() => {
    if (logisticCounts?.status == 200 && logisticCounts?.detail) {
      setCountData(logisticCounts?.detail);
      setTopSellingCountry(logisticCounts?.detail?.topSellingCountry);
      setTotalCountryCount(
        logisticCounts?.detail?.topSellingCountry?.reduce((count, order) => {
          return count + parseInt(order?.count);
        }, 0)
      );
    }
  }, [logisticCounts]);

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
  ];

  return (
    <div styles={styles.dashboardBox}>
      <HeadingBox title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          {countData?.partner ? (
            <DashboardColoredBoxs
              title="Resellers"
              subTitle={countData?.partner}
              icon={relseller}
            />
          ) : (
            <SkeletonNotFound count={4} />
          )}
        </Grid>
        <Grid item xs={4}>
          {countData?.school ? (
            <DashboardColoredBoxs
              bgColor="lightYellow"
              title="School"
              subTitle={countData?.school}
              icon={school}
            />
          ) : (
            <SkeletonNotFound count={4} />
          )}
        </Grid>
        <Grid item xs={4}>
          {countData?.pendingOrder ? (
            <DashboardColoredBoxs
              bgColor="lightBlue"
              title="Pending orders"
              subTitle={countData?.pendingOrder}
              icon={order}
            />
          ) : (
            <SkeletonNotFound count={4} />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          {Object.keys(countData).length > 0 ? (
            <DashboardColoredBoxs
              title="This month"
              className={styles.activityDv}
            >
              <h4>
                New schools <span>{countData?.newSchool}</span>
              </h4>
              <ol>
                <li>
                  About to expire <span>{countData?.aboutToExpire}</span>
                </li>
                <li>
                  Expiry <span>{countData?.expirySchool}</span>
                </li>
              </ol>
              <ButtonGlobal
                title="View expiring schools"
                width="auto"
                onClick={() => router.push("/auth/schools/expiring")}
              />
            </DashboardColoredBoxs>
          ) : (
            <SkeletonNotFound marginTop="40px" marginBottom="40px" count={4} />
          )}
        </Grid>

        <Grid item xs={8}>
          {Object.keys(countData).length > 0 ? (
            <DashboardColoredBoxs
              title="Top selling countries"
              icon={order}
              className={styles.activityDv}
            >
              <h1>
                {topSellingCountry?.[0]?.count}{" "}
                <span>{topSellingCountry?.[0]?.countryName}</span>
              </h1>
              <ul>
                {topSellingCountry?.map((item, ind) => {
                  let getVlaue = parseInt(
                    (item?.count / totalCountryCount) * 100
                  );
                  return (
                    <li key={ind}>
                      <label>
                        <b>{item?.countryName}</b> <span>{item?.count}</span>
                      </label>{" "}
                      <cite style={{ width: getVlaue + "%" }}></cite>{" "}
                    </li>
                  );
                })}
              </ul>
            </DashboardColoredBoxs>
          ) : (
            <SkeletonNotFound marginTop="40px" marginBottom="40px" count={4} />
          )}
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeadingBox title="Latest orders" />
          {orders.length > 0 ? (
            <Table data={orders} columns={columns} limit={50} search={true} />
          ) : (
            <SkeletonNotFound />
          )}
        </Grid>
      </Grid>

      {isComment && (
        <ModalGlobal activeState={isComment} onClick={setIsComment}>
          <OrderComment comment={financeCommentText} />
        </ModalGlobal>
      )}
    </div>
  );
}

LogisticDashboard.propTypes = {};

export default LogisticDashboard;
