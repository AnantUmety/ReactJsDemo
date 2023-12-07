import React, { useEffect, useState } from "react";
import styles from "./PartnerStatus.module.scss";
import ButtonGlobal from "@/component/ButtonGlobal";
import inviteTeam from "../../../public/images/preLogin/inviteTeam.png";
import {
  HeadingBox,
  SearchBar,
  SkeletonNotFound,
} from "@/component/Assets/Elements";
import Table from "@/component/Table";
import { useRouter } from "next/router";
import { Status } from "@/component/Table/Status";
import { Actions } from "@/component/Table/Actions";
import { useSelector, useDispatch } from "react-redux";
import { getResellersAction } from "@/redux/action/getResellersAction";
import AddPartner from "../AddPartner/AddPartner";
import { RESET_ADD_RESELLER } from "@/redux/constants";
import { getResellerByUserIdAction } from "@/redux/action/getResellerByUserIdAction";
import { TableBoxPagination } from "@/component/Assets/Elements";
import { addResellerAction } from "@/redux/action/addResellerAction";

const PartnerStatus = ({ src }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [resellers, setResellers] = useState([]);
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [partnerDataToUpdate, setPartnerDataToUpdate] = useState({});
  const [accesibleCountries, setAccesibleCountries] = useState([]);
  const [reportIwillAccess, setReportIwillAccess] = useState([]);
  const [reportcanAccessMine, setreportcanAccessMine] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isChangeStatus, setIsChangeStatus] = useState(null);
  const [data, setData] = useState([]); 



  let hitInitialApi = false;

  const { resellerList, resellerCount, resellerByUserId } = useSelector(
    (state) => {
      return {
        resellerList: state?.resellerData?.resellerList?.rows,
        resellerCount: state?.resellerData?.resellerList?.count,
        resellerByUserId: state?.resellerData?.resellerByUserId,
      };
    }
  );

  useEffect(() => {
    if (resellerByUserId && Object.keys(resellerByUserId)?.length > 0) {
      if (isChangeStatus) {
        let requestData = {
          accountStatus: resellerByUserId.status == "A" ? "I" : "A",
          resellerId: resellerByUserId.resellerId,
        };
        dispatch(addResellerAction(requestData, "update"));
        let ind = resellers.findIndex(
          (item) => item.resellerId === resellerByUserId.resellerId
        );
        resellers[ind].resellerStatus = requestData.accountStatus;
        setIsChangeStatus(false);
      } else {
        const formList = {
          firstName: resellerByUserId?.resellerFirstName,
          lastName: resellerByUserId?.resellerLastName,
          companyName: resellerByUserId?.resellerOrgName,
          phoneNo: resellerByUserId?.resellerMobileNo,
          email: resellerByUserId?.resellerEmailId,
          countryId: resellerByUserId?.resellerCountryId,
          address: resellerByUserId?.resellerAddress,
          zipCode: resellerByUserId?.resellerZipcode,
          accessibleCountryIds: resellerByUserId?.assessbleCountryIds,
          files: resellerByUserId?.files,
          notification: resellerByUserId?.notification,
          isApiEnable: resellerByUserId?.isApiEnabled,
          resellerId: resellerByUserId?.resellerId,
          resellerCountryName: resellerByUserId?.resellerCountryName,
        };
        setIsAdd(false);
        setShowAddPartner(true);
        let data = [];
        let dataforApi = [];

        resellerByUserId.assessbleCountryIds?.map((item) => {
          dataforApi.push[item.countryId];
          data.push({
            value: item.countryId,
            label: item.shortName,
          });
        });
        formList.accessibleCountryIds = dataforApi;
        setAccesibleCountries(data);

        dataforApi = [];
        data = [];
        resellerByUserId?.reportWhomIwillAccess?.map((item) => {
          dataforApi.push[item.oid];
          data.push({
            value: item.oid,
            label: item.firstName + " " + item.lastName,
          });
        });
        formList.reportWhomIwillAccess = dataforApi;
        setReportIwillAccess(data);

        data = [];
        dataforApi = [];
        resellerByUserId?.reportWhoCanAccessMine?.map((item) => {
          dataforApi.push[item.oid];
          data.push({
            value: item.oid,
            label: item.firstName + " " + item.lastName,
          });
        });
        formList.reportWhoCanAccessMine = dataforApi;

        setreportcanAccessMine(data);
        setPartnerDataToUpdate(formList);
      }

      dispatch({ type: RESET_ADD_RESELLER });
    }
  }, [resellerByUserId]);



  useEffect(() => {
    if (dispatch && !hitInitialApi) {
      hitInitialApi = true;
      dispatch(getResellersAction());
    }
  }, [dispatch]);

  const editActionClicked = (data) => {
    setIsChangeStatus(false);
    dispatch({ type: RESET_ADD_RESELLER });
    dispatch(getResellerByUserIdAction(data.resellerId));
  };

  const inactiveActionClicked = (resellerData) => {
    setIsChangeStatus(true);
    dispatch(getResellerByUserIdAction(resellerData.resellerId));
  };

  const statusFunc = (resellerData) => {
    return (
      <Status
        status={
          resellerData.resellerStatus == "A"
            ? "Active"
            : resellerData.resellerStatus == "P"
            ? "Pending"
            : "Inactive"
        }
      />
    );
  };

  const linkFunc = (resellerData) => {
    return (
      <a
        className={styles.linkColor}
        href={`/auth/logistic/partner/school/${resellerData.resellerId}`}
      >
        {resellerData.resellerOrgName}
      </a>
    );
  };

  const actionFunc = (data, index) => {
    let activeMesage =
      data.resellerStatus == "A"
        ? "Inactivate this user"
        : data.resellerStatus == "I"
        ? "Activate this user"
        : "";
    return (
      <Actions
        data={["Edit", activeMesage]}
        onClicked={(isActive) => {
          if (isActive) {
            setActiveIndex(index);
          } else {
            setActiveIndex(null);
          }
        }}
        handleAction={[
          () => {
            editActionClicked(data);
          },
          () => inactiveActionClicked(data),
        ]}
        active={activeIndex === index}
      />
    );
  };

  const columns = [
    {
      Header: "Serial No",
      accessor: "serialNumber",
      Cell: ({ row }) => {
        return row.index + 1;
      },
    },
    {
      Header: "Company name",
      accessor: linkFunc,
    },
    {
      Header: "Name",
      accessor: "firstName",
      Cell: (cellInfo) => {
        const { row } = cellInfo;
        const fullName = `${row.original.resellerFirstName} ${row.original.resellerLastName}`;
        return <>{fullName}</>;
      },
    },
    {
      Header: "Country",
      accessor: "resellerCountryName",
      arrow: true,
    },
    {
      Header: "Status",
      accessor: statusFunc,
      arrow: true,
    },
    {
      Header: " ",
      accessor: actionFunc,
      arrow: true,
    },
  ];

  const resellerDataUpdated = () => {
    setResellers([]);
    dispatch(getResellersAction());
    setShowAddPartner(false);
  };

  const onBackPressed = () => {
    setShowAddPartner(false);
  };

  const handleSearchTextChange = (e) => {
    const searchText = e?.target?.value;
    setSearchText(searchText);

    if (searchText?.length > 0) {
      setPage(1);
      dispatch(getResellersAction(searchText, limit, 1));
    } else {
      setResellers([]);
      dispatch(getResellersAction("", limit, 1));
    }
  };

  useEffect(() => {
    if (resellerList && resellerList.length > 0 && resellers.length === 0) {
      setTotalCount(resellerCount);
      setResellers(resellerList);
    }
  }, [resellerList]);
  
  useEffect(() => {
    if (resellerList && resellers.length > 0) {
      setResellers(resellerList);
    }
  }, [resellerList]);

  console.log("limit", limit, resellers, resellerList)


  const handleNext = () => {
    setResellers([]);
    setPage(page + 1);
    dispatch(getResellersAction(searchText, limit, page + 1));
  };

  const handlePrevious = () => {
    setResellers([]);
    setPage(page - 1);
    dispatch(getResellersAction(searchText, limit, page - 1));
  };

  useEffect(() => {
    // Fetch data from your API here using the updated 'limit' state
    if(limit){
      setLimit(limit);
    }
       // Update the 'data' state with the new data
  }, [limit]); // Listen for changes to 'limit'

  return (
    <div className={styles.partnerStatusDv}>
      {showAddPartner ? (
        isAdd ? (
          <AddPartner
            title="Add reseller"
            resellerUpdated={resellerDataUpdated}
            onBackPressed={onBackPressed}
            type="add"
          />
        ) : (
          <AddPartner
            formList={partnerDataToUpdate}
            resellerUpdated={resellerDataUpdated}
            title="Update reseller"
            onBackPressed={onBackPressed}
            accesibleCountries={accesibleCountries}
            reportIwillAccess={reportIwillAccess}
            reportcanAccessMine={reportcanAccessMine}
            type="update"
          />
        )
      ) : (
        <>
          <HeadingBox
            className={styles.addPartDv}
            title="Reseller"
            onClicked={() => {
              dispatch({ type: RESET_ADD_RESELLER });
              setIsAdd(true);
              setShowAddPartner(true);
            }}
            btn={{ title: "Add Reseller", src: inviteTeam }}
          />
          

          {resellerList ? (
            <>
              <Table
                search={
                  <SearchBar
                    tableSearch
                    width="quarter"
                    placeholder="Search"
                    isSearch={searchText}
                    setIsSearch={handleSearchTextChange}
                  />
                }
                data={resellers}
                columns={columns}
                limit={limit}
                // uploadBtn={
                //   <ButtonGlobal
                //     bgColor="border"
                //     width="auto"
                //     title="Export CSV"
                //   />
                // }
              />

              <TableBoxPagination
                page={page}
                limit={limit}
                data={resellers}
                totalCount={totalCount}
                searchText={searchText}
                setLimit={setLimit}
                showPrevious={page > 1}
                showNext={
                  resellers?.length == limit && totalCount > page * limit
                }
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                selectBox={(e) => {
                  setResellers([]);
                  setPage(1);
                  setLimit(Number(e.target.value)); 
                  dispatch(getResellersAction(searchText, Number(e.target.value), 1));
                }}
              />
            </>
          ) : (
            <SkeletonNotFound />
          )}
        </>
      )}
    </div>
  );
};

PartnerStatus.propTypes = {};

export default PartnerStatus;
