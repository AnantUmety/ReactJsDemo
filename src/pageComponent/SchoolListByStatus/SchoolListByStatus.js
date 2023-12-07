import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SchoolStatus.module.scss";
import ButtonGlobal from "@/component/ButtonGlobal";
import inviteTeam from "../../../public/images/preLogin/inviteTeam.png";
import yesIcon from "../../../public/images/global/paperclip.svg";
import filter from "../../../public/images/global/filter.png";
import Select from "react-select";
import {
  HeadingBox,
  SearchBar,
  SkeletonLoading,
  SkeletonNotFound,
  TableBoxPagination,
  customStylesBorderAuto,
} from "@/component/Assets/Elements";
import Table from "@/component/Table";
import { useSelector, useDispatch } from "react-redux";
import { getOrganizationAction } from "@/redux/action/getOrganizationAction";
import AddSchool from "../AddSchool/AddSchool";
import { getCookie } from "@/utils/cookies";
import {
  RESELLER_ID,
  RESET_ADD_LICENSE,
  RESET_ADD_ORGANIZATION,
  USER_RESELLER,
  USER_TYPE,
  USER_UTID,
} from "@/redux/constants";
import { getOrganiztionByResellerIdAction } from "@/redux/action/getOrganiztionByResellerIdAction";
import Link from "next/link";
import { getResellersAction } from "@/redux/action/getResellersAction";
import moment from "moment";
import AddLicense from "../AddLicense/AddLicense";
import { getResellerByUserIdAction } from "@/redux/action/getResellerByUserIdAction";

const SchoolListByStatus = ({ resellerId = "", status = "" }) => {
  const dispatch = useDispatch();
  const [schools, setSchools] = useState([]);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [schoolDataToUpdate, setSchoolDataToUpdate] = useState({});
  const [columns, setColumns] = useState([]);
  const [resellerForFilter, setResellerForFilter] = useState([]);
  const [isFilteredApplied, setIsFilteredApplied] = useState(false);
  const [resellers, setResellers] = useState([]);
  const [showFilterValues, setShowFilterValues] = useState(false);

  const [isAddLicense, setIsAddLicense] = useState(false);
  const [orgId, setOrgId] = useState(-1);
  let hitInitialApi = false;
  if (getCookie(USER_TYPE) == USER_RESELLER)
    resellerId = getCookie(RESELLER_ID);

  const {
    schoolList,
    schoolCount,
    schoolListByReseller,
    schoolCountByReseller,
    resellerList,
    resellerByUserId,
  } = useSelector((state) => {
    return {
      schoolList: state?.organizationData?.organizationList?.rows,
      schoolCount: state?.organizationData?.organizationList?.count,
      schoolListByReseller:
        state?.organizationData?.organizationByResellerId?.rows,
      schoolCountByReseller:
        state?.organizationData?.organizationByResellerId?.count,
      resellerList: state?.resellerData?.resellerList?.rows,
      resellerByUserId: state?.resellerData?.resellerByUserId,
    };
  });

  useEffect(() => {
    if (
      ((schoolList && schoolList.length > 0) ||
        (schoolListByReseller && schoolListByReseller.length > 0)) &&
      schools?.length == 0
    ) {
      setTotalCount(resellerId ? schoolCountByReseller : schoolCount);
      setSchools(resellerId ? schoolListByReseller : schoolList);
    }
  }, [schoolList, schoolListByReseller]);

  useEffect(() => {
    if (resellerList && resellerList.length > 0 && resellers.length == 0) {
      let res = [];
      resellerList.map((item) => {
        let data = {};
        data.label = item.firstName + " " + item.lastName;
        data.value = item.resellerId;
        res.push(data);
      });
      setResellers(res);
    }
  }, [resellerList]);

  useEffect(() => {
    setColumnData();
  }, [schools, schoolListByReseller]);

  useEffect(() => {
    if (dispatch && !hitInitialApi && status && status != "") {
      hitInitialApi = true;
      if (getCookie(USER_TYPE) == USER_RESELLER)
        resellerId = getCookie(RESELLER_ID);
      dispatch(getResellersAction());
      if (resellerId) {
        dispatch(getResellerByUserIdAction(resellerId));
      }
      // hitGetOrganization("", limit, 1);

      let statusValue = "";
      statusValue = status == "expiring" ? "E" : status == "pending" ? "I" : "";
      if (resellerId) {
        dispatch(
          getOrganiztionByResellerIdAction(
            resellerId,
            "",
            limit,
            1,
            statusValue
          )
        );
      } else {
        dispatch(getOrganizationAction("", limit, 1, [], statusValue));
      }
    }
  }, [status]);

  const editActionClicked = (data) => {
    setIsAdd(false);
    setShowAddSchool(true);
    const formList = {
      username: data.username,
      utId: getCookie(USER_UTID),
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.compnayName,
      phoneNo: data.mobile,
      email: data.email,
      countryId: -1,
      countryName: data.countryName,
      address: "",
      zipCode: "",
      accessibleCountryIds: [],
      fileUrl: "",
      notification: [],
      reportWhomIwillAccess: [],
      reportWhoCanAccessMine: [],
      isApiEnable: false,
      schoolId: data.schoolId,
      userSid: data.userSid,
    };
    setSchoolDataToUpdate(formList);
  };

  const linkFunc = (data) => {
    return <a href={`/auth/school-details/${data.orgId}`}>{data.orgName}</a>;
  };

  const agreementFunc = (data) => {
    return (
      <p className={styles.peraLnk}>
        {data?.agreementDoc ? (
          <Link target="_blank" href={data?.agreementDoc}>
            <b>Yes</b>
            <Image src={yesIcon} alt="" />
          </Link>
        ) : (
          "No"
        )}
      </p>
    );
  };

  const expiresOnHandler = (data, v) => {
    let statusVal = "N";

    if (data?.licenceTo) {
      var date = moment(data?.licenceTo);
      var now = moment();

      if (now > date) {
        statusVal = "E";
      } else {
        statusVal = "A";
      }
    }

    return (
      <p
        className={
          statusVal == "N"
            ? styles.colors2
            : statusVal == "E"
            ? styles.colors1
            : styles.colors
        }
      >
        {statusVal == "N"
          ? "--"
          : statusVal == "E"
          ? "Expired"
          : moment(data?.licenceTo).format("Do MMMM  YYYY")}
      </p>
    );
  };

  const setColumnData = () => {
    let col = [];
    if (resellerId == "") {
      col = [
        {
          Header: "School Name",
          accessor: "orgName",
          // Cell: ({ row }) => (
          //   <a href={`/auth/school-details/${row.original.orgId}`}>
          //     {row.original.orgName}
          //   </a>
          // ),
        },
        {
          Header: "Account ID",
          accessor: "accountId",
        },
        {
          Header: "Admin Name",
          accessor: "schoolAdminFirstName",
          Cell: (cellInfo) => {
            const { row } = cellInfo;
            const firstName =
              row.original.schoolAdminFirstName != null
                ? row.original.schoolAdminFirstName
                : "-";
            const lastName =
              row.original.schoolAdminLastName != null
                ? row.original.schoolAdminLastName
                : "-";
            return (
              <>
                {firstName} {lastName}
              </>
            );
          },
        },
        {
          Header: "Reseller Name",
          accessor: "resellerFirstName",
          Cell: (cellInfo) => {
            const { row } = cellInfo;
            const fullName = `${row.original.resellerFirstName} ${row.original.resellerLastName}`;
            return <>{fullName}</>;
          },
        },
        {
          Header: "Expiry",
          accessor: expiresOnHandler,
        },
        {
          Header: "Agreement",
          accessor: agreementFunc,
        },
      ];
    } else {
      col = [
        {
          Header: "School Name",
          accessor: "orgName",
          // Cell: ({ row }) => (
          //   <a href={`/auth/school-details/${row.original.orgId}`}>
          //     {row.original.orgName}
          //   </a>
          // ),
        },
        {
          Header: "Account ID",
          accessor: "accountId",
        },
        {
          Header: "Admin Name",
          accessor: "schoolAdminFirstName",
          Cell: (cellInfo) => {
            const { row } = cellInfo;
            const firstName =
              row.original.schoolAdminFirstName != null
                ? row.original.schoolAdminFirstName
                : "-";
            const lastName =
              row.original.schoolAdminLastName != null
                ? row.original.schoolAdminLastName
                : "-";
            return (
              <>
                {firstName} {lastName}
              </>
            );
          },
        },
        {
          Header: "Expiry",
          accessor: expiresOnHandler,
        },
        {
          Header: "Agreement",
          accessor: agreementFunc,
        },
      ];
    }
    setColumns(col);
  };

  const schoolDataUpdated = (orgId) => {
    setShowAddSchool(false);
    setIsAddLicense(true);
    setOrgId(orgId);
    dispatch({ type: RESET_ADD_ORGANIZATION });
  };

  const licenseSaved = () => {
    dispatch({ type: RESET_ADD_LICENSE });
    setSchools([]);
    if (resellerId) dispatch(getOrganiztionByResellerIdAction(resellerId));
    else dispatch(getOrganizationAction());
    setShowAddSchool(false);
    setIsAddLicense(false);
  };

  const onBackPressed = () => {
    setShowAddSchool(false);
  };

  const handleSearchTextChange = (e) => {
    const searchText = e?.target?.value;
    setSearchText(searchText);
    if (searchText?.length > 0) {
      setPage(1);
      hitGetOrganization(searchText, limit, 1);
    } else {
      hitGetOrganization("", limit, 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    hitGetOrganization(searchText, limit, page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
    hitGetOrganization(searchText, limit, page - 1);
  };

  const hitGetOrganization = (
    searchText,
    limit,
    page,
    filterApplied = isFilteredApplied
  ) => {
    setSchools([]);

    let statusValue = "";
    statusValue = status == "expiring" ? "E" : status == "pending" ? "I" : "";

    if (resellerId)
      dispatch(
        getOrganiztionByResellerIdAction(
          resellerId,
          searchText,
          limit,
          page,
          statusValue
        )
      );
    else {
      let resellerIds = [];
      if (filterApplied)
        resellerForFilter.map((item) => {
          resellerIds.push(item.value);
        });

      dispatch(
        getOrganizationAction(searchText, limit, page, resellerIds, statusValue)
      );
    }
  };

  const handleApplyFilterClick = () => {
    setIsFilteredApplied(true);
    hitGetOrganization(searchText, limit, 0, true);
  };

  const handleClearFilterClick = () => {
    setIsFilteredApplied(false);
    setShowFilterValues(fals);
    setResellerForFilter([]);
    hitGetOrganization(searchText, limit, 0, false);
  };

  return (
    <div className={styles.SchoolStatusDv}>
      {isAddLicense && (
        <AddLicense
          setIsAddLicense={setIsAddLicense}
          licenseSaved={licenseSaved}
          orgId={orgId}
        />
      )}
      {/* {resellerId &&
        showAddSchool &&
        (isAdd ? (
          <AddSchool
            resellerId={resellerId}
            title="Add School"
            schoolUpdated={schoolDataUpdated}
            onBackPressed={onBackPressed}
            type="add"
          />
        ) : (
          <AddSchool
            resellerId={resellerId}
            formList={schoolDataToUpdate}
            schoolUpdated={schoolDataUpdated}
            title="Update School"
            onBackPressed={onBackPressed}
            type="update"
          />
        ))} */}

      {!showAddSchool && !isAddLicense ? (
        <>
          <HeadingBox
            className={styles.addPartDv}
            title="School"
            onClicked={() => {
              setIsAdd(true);
              setShowAddSchool(true);
            }}
            // btn={{ title: resellerId && resellerByUserId?.status=="A" && getCookie(USER_TYPE)!= USER_RESELLER ? "Add School" : "", src: inviteTeam }}
          />

          {schools ? (
            <>
              {!resellerId && showFilterValues && (
                <div className={styles.filterListing}>
                  <h3>Filters</h3>
                  <hgroup>
                    <Select
                      isMulti
                      options={resellers}
                      value={resellerForFilter}
                      onChange={(option) => setResellerForFilter(option)}
                      placeholder="Reseller"
                      styles={customStylesBorderAuto}
                      maxMenuHeight={150}
                    />
                  </hgroup>
                  <hgroup>
                    <ButtonGlobal
                      width="auto"
                      title="Apply"
                      disable={resellerForFilter.length == 0}
                      onClick={handleApplyFilterClick}
                    />
                    <ButtonGlobal
                      bgColor="gray"
                      width="auto"
                      title="Clear filters"
                      disable={!isFilteredApplied}
                      onClick={handleClearFilterClick}
                    />
                  </hgroup>
                </div>
              )}

              <Fragment>
                <Table
                  className={showFilterValues && styles.schoolClasses}
                  search={
                    <SearchBar
                      tableSearch
                      width="quarter"
                      placeholder="Search"
                      isSearch={searchText}
                      setIsSearch={handleSearchTextChange}
                    />
                  }
                  data={schools}
                  limit={limit}
                  columns={columns}
                  uploadBtn={
                    <>
                      {!resellerId && (
                        <ButtonGlobal
                          bgColor="border"
                          width="auto"
                          title="Filters"
                          onClick={() => {
                            setShowFilterValues(!showFilterValues);
                          }}
                          className={showFilterValues && styles.iconReverse}
                          icon={{ src: filter }}
                        />
                      )}
                      {/* <ButtonGlobal
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
                  data={schools}
                  totalCount={totalCount}
                  searchText={searchText}
                  setLimit={setLimit}
                  showPrevious={page > 1}
                  showNext={
                    schools?.length == limit && totalCount > page * limit
                  }
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  selectBox={(e) => {
                    setPage(1);
                    setLimit(Number(e.target.value));
                    hitGetOrganization(searchText, Number(e.target.value), 1);
                  }}
                />
              </Fragment>
            </>
          ) : (
            <SkeletonNotFound />
          )}
        </>
      ) : (
        <SkeletonNotFound />
      )}
    </div>
  );
};

SchoolListByStatus.propTypes = {};

export default SchoolListByStatus;
