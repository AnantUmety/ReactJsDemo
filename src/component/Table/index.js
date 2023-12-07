import Image from "next/image";
import React, { useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useFilters,
} from "react-table";
import styles from "./tb.module.scss";
import tabUp from "../../../public/images/preLogin/tabUp.png";
import left from "../../../public/images/logistics/left.png";
import right from "../../../public/images/logistics/right.png";
import searchImg from "../../../public/images/logistics/search.png";
import { SkeletonLoading, SkeletonNotFound } from "../Assets/Elements";

function CustomSelectFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    const optionsSet = new Set();
    preFilteredRows.forEach((row) => {
      optionsSet.add(row.values[id]);
    });
    return Array.from(optionsSet);
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({
  columns,
  data,
  limit,
  placeholder,
  navigation,
  uploadBtn,
  assets,
  search,
  rightSearch,
  className,
}) {

  console.log("limits", limit)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: limit },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const handleChange = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  console.log("data", data, page)

  return (
    <div
      attr="tables"
      className={`${styles.tableFull} ${className && [className]}`}
    >
      {!assets && (
        <div
          data-attr="tableDiv"
          className={`${styles.tableDiv} ${
            rightSearch && !uploadBtn && styles.rightSearch
          }`}
        >
          {!search ? (
            <aside>
              <Image src={searchImg} alt="" />
              <input
                placeholder={placeholder || "Search"}
                value={globalFilter || ""}
                onChange={handleChange}
                className={styles.inputClassName}
              />
            </aside>
          ) : (
            <>{search}</>
          )}

          {uploadBtn && <div className={styles.uploadBtnDv}>{uploadBtn}</div>}
        </div>
      )}

      {data?.length > 0 ? (
        <div className="globaltable">
          <table {...getTableProps()} border="0">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={"tr"} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, headerIndex) => (
                    <th
                      key={headerIndex}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "desc"
                            : "asc"
                          : ""
                      }
                    >
                      {column.render("Header")}

                      {!column?.arrow && (
                        <span>
                          <Image src={tabUp} alt="" />
                        </span>
                      )}

                      {column.id === "category" ? (
                        <div>
                          <CustomSelectFilter column={column} />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row, pageIndex) => {
                prepareRow(row);
                return (
                  <tr key={pageIndex} {...row.getRowProps()}>
                    {row.cells.map((cell, key) => {
                      return (
                        <td key={key} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // <div className={styles.pageNotFounds}>No data available</div>
        <SkeletonNotFound />
      )}

      {/* {!assets && !search && (
        <div className={styles.tableBottom}>
          <aside>
            Showing {pageIndex * pageSize + 1}-
            {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}{" "}
            entries
          </aside>

          <div className={styles.pageSizeSelect}>
            <label htmlFor="pageSizeSelect">Rows per page</label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <section className={styles.tabBtn}>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <Image src={left} alt="" />
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <Image src={right} alt="" />
            </button>{" "}
          </section>
        </div>
      )} */}
    </div>
  );
}

export default Table;
