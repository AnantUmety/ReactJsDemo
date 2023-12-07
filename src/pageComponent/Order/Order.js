import React, { Fragment, useState, useEffect } from "react";
import {
  BackBtn,
  HeadingBox,
  SearchBar,
  SkeletonLoading,
  SkeletonNotFound,
  TableBoxPagination,
} from "@/component/Assets/Elements";
import { Grid } from "@mui/material";
import Image from "next/image";
import styles from "./order.module.scss";
import { TabContainer, TabHeader } from "@/component/Tabbing/Tab";
import Table from "@/component/Table";
import filter from "../../../public/images/global/filter.png";
import ButtonGlobal from "@/component/ButtonGlobal";
import comment from "../../../public/images/global/comment.png";
import ModalGlobal from "@/component/ModalGlobal";
import OrderComment from "./OrderComment";
import { useSelector, useDispatch } from "react-redux";
import { getOrderListingAction } from "@/redux/action/getOrderListingAction";
import add from "../../../public/images/global/add.png";
import CreateOrder from "../CreateOrder/CreateOrder";
import { getCookie } from "@/utils/cookies";
import {
  RESELLER_ID,
  RESET_CREATE_ORDER,
  USER_RESELLER,
  USER_TYPE,
} from "@/redux/constants";
import { Status } from "@/component/Table/Status";

const Order = () => {
  const [isTabOpen, setIsTabOpen] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [showFilterValues, setShowFilterValues] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [isFilteredApplied, setIsFilteredApplied] = useState(false);
  const [isCreateOrder, setIsCreateOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isApiDataUpdated, setIsApiDataUpdated] = useState(false);
  const dispatch = useDispatch();
  const dataTab = [{ title: "All" }, { title: "Pending" }];
  const [financeCommentText, setFinanceCommentText] = useState("");

  const { orderList, orderCount } = useSelector((state) => {
    return {
      orderList: state?.orderData?.orderList?.rows,
      orderCount: state?.orderData?.orderList?.count,
    };
  });
  let hitInitialApi = false;

  useEffect(() => {
    if (dispatch && !hitInitialApi) {
      hitInitialApi = true;
      // dispatch(getOrderListingAction());
    }
  }, [dispatch]);

  useEffect(() => {
    if (orderList && orderList.length > 0 && orders?.length == 0) {
      setTotalCount(orderCount);
      setOrders(orderList);
      setIsApiDataUpdated(true);
    }
  }, [orderList]);

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
      canSort: true,
    },
    
    {
      Header: "School Name",
      accessor: "orgName",
      canSort: true,
    },
    {
      Header: "Email",
      accessor: "emailId",
      canSort: true,
    },
    {
      Header: "Mobile NO",
      accessor: "phoneNo",
      canSort: true,
    },
    {
      Header: "Reseller",
      accessor: "resellerFirstName",
      Cell: (cellInfo) => {
        const { row } = cellInfo;
        const fullName = `${row.original.resellerFirstName} ${row.original.resellerLastName}`;
        return <>{fullName}</>;
      },
      arrow: true,
    },
    {
      Header: "Finance Status",
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

  const handleSearchTextChange = (e) => {
    const searchText = e?.target?.value;
    setSearchText(searchText);
    if (searchText?.length > 0) {
      setPage(1);
      hitGetOrderListing(searchText, limit, 1);
    } else {
      hitGetOrderListing("", limit, 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    hitGetOrderListing(searchText, limit, page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
    hitGetOrderListing(searchText, limit, page - 1);
  };

  const hitGetOrderListing = (
    searchText,
    limit,
    page,
    filterApplied = isFilteredApplied
  ) => {
    setOrders([]);
    setIsApiDataUpdated(false);
    dispatch(
      getOrderListingAction(searchText, limit, page, isTabOpen == 0 ? "" : "P")
    );
  };

  useEffect(() => {
    setSearchText("");
    hitGetOrderListing();
  }, [isTabOpen]);

  const orderDataUpdated = () => {
    setIsCreateOrder(false);
    setOrders([]);
    dispatch(getOrderListingAction());
    dispatch({ type: RESET_CREATE_ORDER });
  };

  const onBackPressed = () => {
    setIsCreateOrder(false);
  };

  return (
    <Fragment>
      {isCreateOrder && (
        <CreateOrder
          resellerId={getCookie(RESELLER_ID)}
          title="Create Order"
          orderUpdated={orderDataUpdated}
          onBackPressed={onBackPressed}
          type="add"
        />
      )}

      {!isCreateOrder && (
        <div className={styles.ordrDiv}>
          {getCookie(USER_TYPE) == USER_RESELLER ? (
            <HeadingBox
              title="Orders"
              className={styles.addPartDv}
              onClicked={() => {
                dispatch({ type: RESET_CREATE_ORDER });
                setIsCreateOrder(true);
                // dispatch({ type: RESET_ADD_RESELLER });
                // setIsAdd(true);
                // setShowAddPartner(true);
              }}
              btn={{ title: "Create Order", src: add }}
            />
          ) : (
            <HeadingBox title="Orders" />
          )}

          <Grid container>
            <Grid item xs={12} className={styles.helloOrder}>
              <TabHeader
                isOpen={isTabOpen}
                setIsOpen={setIsTabOpen}
                black
                data={dataTab}
              />

              <TabContainer value={isTabOpen} isOpen={isTabOpen}>

                <Fragment>
                  {orderList ? (
                    <>
                      <Table
                        className={showFilterValues && styles.orderClasses}
                        search={
                          <SearchBar
                            tableSearch
                            width="quarter"
                            placeholder="Search"
                            isSearch={searchText}
                            setIsSearch={handleSearchTextChange}
                          />
                        }
                        data={orders}
                        limit={limit}
                        columns={columns}
                        uploadBtn={
                          <>
                            {/* <ButtonGlobal
                              bgColor="border"
                              width="auto"
                              title="Filters"
                              onClick={() => {
                                setShowFilterValues(!showFilterValues);
                              }}
                              className={showFilterValues && styles.iconReverse}
                              icon={{ src: filter }}
                            />

                            <ButtonGlobal
                              bgColor="border"
                              width="auto"
                              title="Export CSV"
                            /> */}
                          </>
                        }
                      />
                      <TableBoxPagination
                        page={page}
                        limit={limit}
                        data={orders}
                        totalCount={totalCount}
                        searchText={searchText}
                        setLimit={setLimit}
                        showPrevious={page > 1}
                        showNext={
                          orders?.length == limit && totalCount > page * limit
                        }
                        handleNext={handleNext}
                        handlePrevious={handlePrevious}
                        selectBox={(e) => {
                          setPage(1);
                          setLimit(Number(e.target.value));
                          hitGetOrderListing(
                            searchText,
                            Number(e.target.value),
                            1
                          );
                        }}
                      />
                    </>
                  ) : (
                    <SkeletonNotFound />
                  )}
                </Fragment>
              </TabContainer>
            </Grid>
          </Grid>
        </div>
      )}

      {isComment && (
        <ModalGlobal activeState={isComment} onClick={setIsComment}>
          <OrderComment comment={financeCommentText} />
        </ModalGlobal>
      )}
    </Fragment>
  );
};

Order.propTypes = {};

export default Order;
