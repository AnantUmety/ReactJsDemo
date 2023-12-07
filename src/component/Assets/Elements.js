import styles from "./elements.module.scss";
import classnames from "classnames";
import ButtonGlobal from "../ButtonGlobal";
import Image from "next/image";
import arrowLeft from "../../../public/images/sidebar/arrowLeft.png";
import Link from "next/link";
import React, { useState, useEffect, Fragment, useRef } from "react";
import innerBannerUrl from "../../../public/images/classes/innerBanner.png";
import right from "../../../public/images/global/right.png";
import InputFields from "../inputFields/InputFields";
import search from "../../../public/images/global/search.png";
import left from "../../../public/images/logistics/left.png";
import rightArrow from "../../../public/images/logistics/right.png";
import DatePicker from "react-datepicker";
import {HiExclamationCircle} from "react-icons/hi"

export const WhiteBox = ({ children, noPadding, className, full }) => {
  return (
    <div
      data-attr="whiteBox"
      className={classnames({
        [styles.whiteBoxCntr]: true,
        [className]: className,
        [styles.noPadding]: noPadding,
        [styles.full]: full,
      })}
    >
      {children}
    </div>
  );
};

//noPadding you want to use box without padding
//full use  for full width  (demo show in login and signup page.)

export const HeadingBox = ({
  title,
  subTitle,
  className,
  btn,
  onClicked,
  border,
  width,
}) => {
  return (
    <div
      className={classnames({
        [styles.headingBoxCntr]: true,
        [className]: className,
        [styles[width]]: width,
      })}
    >
      <h2>
        {title} <span>{subTitle}</span>
      </h2>
      {btn?.title && (
        <ButtonGlobal
          bgColor={border ? "border" : null}
          onClick={onClicked}
          width="auto"
          title={btn.title}
          icon={{ src: btn.src ? btn.src : null }}
        />
      )}
    </div>
  );
};
/*****for top section use heding*****/

/*****dashboardBox  start******/
export const DashboardColoredBoxs = ({
  children,
  title,
  subTitle,
  icon,
  className,
  bgColor,
  heading,
  data,
}) => {
  return (
    <div
      className={classnames({
        [styles.dashboardBox]: true,
        [className]: className,
        [styles[bgColor]]: bgColor,
        [styles.initialBox]: !children,
        [styles.borderLightBox]: children,
        [styles.dataList]: data,
      })}
    >
      {!children ? (
        <>
          <hgroup>
            {heading && <h1>{heading}</h1>}
            {title && !data && (
              <h5 dangerouslySetInnerHTML={{ __html: title }} />
            )}
            {subTitle && !data && (
              <h6 dangerouslySetInnerHTML={{ __html: subTitle }} />
            )}
          </hgroup>
          {data && (
            <ul className={styles.dashboardBoxList}>
              {data?.map((item, ind) => {
                return (
                  <li>
                    {item?.title && <b>{item?.title}</b>}
                    {item?.count !== undefined ? (
                      <span>{item.count}</span>
                    ) : null}

                    {item?.url && item.count > 0 && (
                      <Link href={item?.url}>View All </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {icon && (
            <label>
              <Image src={icon} alt="" />
            </label>
          )}
        </>
      ) : (
        <Fragment>
          <h4>{title}</h4>
          <section
            data-attr="childrenBox"
            className={classnames({
              [styles.childrenBox]: true,
            })}
          >
            {children}
          </section>
        </Fragment>
      )}
    </div>
  );
};

// bgColor by default light lightGreen, lightYellow, lightBlue, none
/*****dashboardBox end******/

export const InformationBox = ({
  title,
  subTitle,
  src,
  children,
  className,
  center,
}) => {
  return (
    <div
      className={classnames({
        [styles.informationBox]: true,
        [className]: className,
        [styles.centerDiv]: center,
      })}
    >
      {src && (
        <label>
          <Image src={src} alt="" />
        </label>
      )}
      {title && <h2>{title}</h2>}
      {subTitle && <p>{subTitle}</p>}
      {children}
    </div>
  );
};

// src: to manage image
// center : to set center
// title: to set heading
/*****InformationBox end******/

export const ClassesBox = ({
  title,
  subTitle,
  modules,
  src,
  teacherImage,
  className,
  onClick,
}) => {
  return (
    <button
      className={classnames({
        [styles.classesBox]: true,
        [className]: className,
        [styles.isNoOnClick]: !onClick,
      })}
      onClick={onClick ? onClick : null}
    >
      {src && (
        <label>
          <Image src={src} alt="" />
          <span>
            <Image src={teacherImage} alt="" />
          </span>
        </label>
      )}
      <aside>
        {title && <h3>{title}</h3>}
        {subTitle && <h4>{subTitle}</h4>}
        {modules && (
          <h5>
            {modules.complete} / {modules.total} modules
          </h5>
        )}
        <h6>
          <span
            style={{ width: (modules.complete / modules.total) * 100 + "%" }}
          ></span>
        </h6>
      </aside>
    </button>
  );
};

// src: to manage image
// center : to set center
// title: to set heading
/*****InformationBox end******/

export const FullBox = ({
  title,
  content,
  tags,
  src,
  teacherImage,
  className,
  onClick,
  btn,
}) => {
  return (
    <div
      className={classnames({
        [styles.fullBoxDv]: true,
        [className]: className,
        [styles.isNoOnClick]: !onClick,
      })}
    >
      {src && (
        <label onClick={onClick ? onClick : null}>
          <Image src={src} alt="" />
          <span>
            <Image src={teacherImage} alt="" />
          </span>
        </label>
      )}

      <aside>
        {title && (
          <h3>
            {title} <Image src={right} alt="" />
          </h3>
        )}
        {content && <p>{content}</p>}
        <hgroup>
          {tags && (
            <ul className={styles.tagsList}>
              {tags?.map((item, ind) => {
                return <li key={ind}>{item}</li>;
              })}
            </ul>
          )}
          {btn?.title && <ButtonGlobal title={btn?.title} width="auto" />}
        </hgroup>
      </aside>
    </div>
  );
};

// src: to manage image
// center : to set center
// title: to set heading
/*****InformationBox end******/

/****************************************boxes section end********************************************************/

export const BackBtn = ({ className, path, onClicked }) => {
  return (
    <div
      className={classnames({
        [styles.backBtn]: true,
        [className]: className,
      })}
      data-attr="backBtn"
    >
      {path ? (
        <Link href={path ? path : "/"}>
          <Image src={arrowLeft} alt="" />
        </Link>
      ) : (
        <button onClick={onClicked}>
          <Image src={arrowLeft} alt="" />
        </button>
      )}
    </div>
  );
};

export const ButtonLink = ({ title, className, onClick, size, icon }) => {
  return (
    <button
      type="button"
      className={classnames({
        [styles.buttonLink]: true,
        [className]: className,
        [styles[size]]: size,
        [styles.btnIconSrc]: icon?.src,
        [styles.btnIconRight]: icon?.align === "right",
      })}
      data-attr="backBtn"
      {...(onClick ? { onClick } : {})}
    >
      {icon?.src && <Image src={icon?.src} alt="" />} {title}
    </button>
  );
};

export const customStylesBorder = {
  control: (provided) => ({
    ...provided,
    height: 36,
    borderRadius: 8,
    background: "tranaparent",
    border: 0,
    color: "white",
    paddingLeft: 10,
    width: 229,
    cursor: "pointer",
    border: "1px solid #C1C7D0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f8f8f8" : "#EBECF0",
    color: state.isFocused ? "#42526E" : "#42526E",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderRadius: 8,
    border: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#42526E",
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: "4px 0 0 0",
    border: 0,
    zIndex: 3,
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#3265F3",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#091E42",
    opacity: "0.4",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorContainer: () => ({ display: "none" }),
};

export const customStylesBorderAuto = {
  control: (provided) => ({
    ...provided,
    height: 36,
    borderRadius: 8,
    background: "tranaparent",
    border: 0,
    color: "white",
    paddingLeft: 10,
    minWidth: 230,
    cursor: "pointer",
    border: "1px solid #C1C7D0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f8f8f8" : "#EBECF0",
    color: state.isFocused ? "#42526E" : "#42526E",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderRadius: 8,
    border: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#42526E",
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: "4px 0 0 0",
    border: 0,
    zIndex: 3,
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#3265F3",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#091E42",
    opacity: "0.4",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorContainer: () => ({ display: "none" }),
};

export const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: 50,
    borderRadius: 12,
    background: "none",
    border: 0,
    color: "white",
    paddingLeft: 10,
    width: "100%",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f8f8f8" : "#EBECF0",
    color: state.isFocused ? "#42526E" : "#42526E",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: "#fff",
    paddingTop: "20px",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderRadius: 8,
    border: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#42526E",
    // paddingTop: "18px",
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: "4px 0 0 0",
    border: 0,
    zIndex: 3,
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#3265F3",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "#fff",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#091E42",
    opacity: "0.4",
    marginTop: "-15px",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorContainer: () => ({ display: "none" }),
};

export const customStylesAb = {
  control: (provided) => ({
    ...provided,
    height: "40px",
    borderRadius: "12px",
    background: "#EBECF0",
    border: 0,
    color: "white",
    paddingLeft: 10,
    width: "100%",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#f8f8f8" : "#EBECF0",
    color: state.isFocused ? "#42526E" : "#42526E",
    cursor: "pointer",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderRadius: 8,
    border: 0,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#42526E",
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: "8px 0 0 0",
    width: 190,
    border: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#42526E",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorContainer: () => ({ display: "none" }),
};

export const customStylesBlue = {
  control: (provided, state) => ({
    ...provided,
    height: "30px",
    borderRadius: "8px",
    background: "#0946F1",
    border: "0px",
    paddingLeft: 10,
    width: "100%",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#091E42" : "#0946F1",
    color: "#fff",
    cursor: "pointer",
    border: 0,
    margin: 0,
  }),

  container: (provided, state) => ({
    ...provided,
    "data-select-box": true,
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "#fff" : "#fff",
    backgroundColor: "#3265F3",
    borderRadius: "0 8px 8px 0",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  menuList: (provided, state) => ({
    ...provided,
    padding: 0,
    borderRadius: 8,
    border: 0,
  }),
  menu: (provided, state) => ({
    ...provided,
    margin: "4px 0 0 0",
  }),
  indicatorContainer: () => ({ display: "none" }),
};

/*****Tooltip  start******/
export const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <cite
      className={styles.tooltipContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <label className={styles.tooltipDv}>{text}</label>
      <em>{children}</em>
    </cite>
  );
};
/*****Tooltip  end******/

/*****radiu and checkbox  start******/
export const RadioButton = ({ name, id, value, onChange, checked, label }) => {
  return (
    <label htmlFor={id} className={styles.radioButtonLabel}>
      <input
        className={styles.radioButtonInput}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.radioButtonCustom}></span>
      {label}
    </label>
  );
};

export const CheckboxButton = ({
  label,
  initialValue = false,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label
      className={classnames({
        [styles.customCheckbox]: true,
        [className]: true,
      })}
    >
      <input
        type="checkbox"
        onChange={handleChange}
        aria-label={label}
        checked={isChecked}
      />
      <span
        className={`${styles.checkmark} ${isChecked && styles.checkmarkAct}`}
      ></span>
      {label}
    </label>
  );
};

/*****radiu and checkbox  end******/

export const Switchs = ({ id, setSwitchData }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    setSwitchData((prevFormData) => ({
      ...prevFormData,
      [id]: !isChecked,
    }));
  };

  return (
    <cite
      className={`${styles.switchs} ${isChecked ? styles.onSw : styles.offSw}`}
      onClick={toggleSwitch}
    >
      <em
        className={`${styles.sliderSw} ${
          isChecked ? styles.onSw : styles.offSw
        }`}
      />
    </cite>
  );
};

/*****radiu and checkbox  end******/

export const InnerBanner = ({ title, subTitle, children }) => {
  return (
    <div
      style={{ backgroundImage: `url(${innerBannerUrl?.src})` }}
      className={`${styles.innerBannerDv}`}
    >
      <div className={styles.inBanClassLeft}>
        <BackBtn />
        <HeadingBox title={title} subTitle={subTitle} />
      </div>

      <div className={styles.graphBox}>
        <div className={styles.borderRadiusDv}>
          <span>11%</span>
          <b>Progress</b>
        </div>
        <div className={styles.borderRadiusDv}>
          <span>72%</span>
          <b>Avg.Score</b>
        </div>
      </div>

      <div className={styles.inBanClassRight}>
        {children}
        <ButtonGlobal title="View result" bgColor="white" width="auto" />
      </div>
    </div>
  );
};

// smallPadding to set  16px
/*****radiu and checkbox  end******/

export const SearchBar = ({
  isSearch,
  setIsSearch,
  placeholder,
  className,
  full,
  width,
  tableSearch,
}) => {
  return (
    <from
      className={classnames({
        [styles.searchBarDiv]: true,
        [className]: className,
        [styles.fullInput]: full,
        [styles[width]]: width,
      })}
    >
      <InputFields
        border
        placeholder={placeholder}
        value={isSearch}
        onChange={setIsSearch}
      />
      <button>
        <Image src={search} alt="" />
      </button>
    </from>
  );
};


// smallPadding to set  16px
/*****radiu and checkbox  end******/

export const TableBoxPagination = ({
  page = 0,
  limit = 10,
  data = [],
  totalCount = 0,
  searchText = "",
  showPrevious = false,
  showNext = false,
  handleNext,
  handlePrevious,
  selectBox,
  setLimit,
}) => {
  console.log("limitss", limit)
  return (
    <div className={styles.tableBottomPg}>
      <aside>
        Showing {(page - 1) * limit + 1}-{(page - 1) * limit + data?.length} of{" "}
        {totalCount} entries
      </aside>

      <div
        className={`${styles.pageSizeSelectPg} ${
          totalCount <= 10 && styles.tableDisable
        }`}
      >
        <label htmlFor="pageSizeSelect">Rows per page</label>
        {/* <select id="pageSizeSelect" value={limit} onChange={selectBox}> */}
        <select id="pageSizeSelect" value={limit} onChange={(e) => {
          setLimit(Number(e.target.value));
          selectBox(e); 
        }}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <section
        className={`${styles.tabBtn} ${
          totalCount <= 10 && styles.tableDisable
        }`}
      >
        <button disabled={!showPrevious} onClick={handlePrevious}>
          {" "}
          <Image src={left} alt="" />{" "}
        </button>{" "}
        <button onClick={handleNext} disabled={!showNext}>
          <Image onClick={handleNext} src={rightArrow} alt="" />
        </button>
      </section>
    </div>
  );
};

export const SelectNumber = ({ countryCode = "+91", setCountryCode }) => {
  const elementRef = useRef(null);
  const [isOpen, setOIsOpen] = useState(false);
  const [labelText, setLabelText] = useState("+91");
  const numberData = ["+91", "+020", "+021"];
  const numberHandler = (val) => {
    setLabelText(val);
    setOIsOpen(!isOpen);
    setCountryCode(val);
  };

  const handleClickOutside = (event) => {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      setOIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={elementRef} className={styles.selectNumber}>
      <button
        onClick={() => setOIsOpen(!isOpen)}
        className={`${styles.selectNumberLabel} ${!isOpen && styles.openDown}`}
      >
        {labelText}
      </button>
      {isOpen && (
        <div className={styles.selectNumberUl}>
          {numberData.map((v, i) => {
            return (
              <button onClick={() => numberHandler(v)} key={i}>
                {v}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

/************datepicker start***********/
export const DatePickers = ({ title, selected, onChange, minDate }) => {
  return (
    <div className={styles.datePickerList}>
      {title && <em>{title}</em>}
      <DatePicker
        placeholderText="MM/DD/YY"
        selected={selected}
        onChange={onChange}
        className="datePicker"
        calendarClassName="datePicketCalander"
        minDate={minDate}
      />
    </div>
  );
};
/************datepicker end***********/

/************dropdown start***********/
export const DropDownHandler = () => {
  return <div className={styles.dropDownHandler}></div>;
};
/************dropdown end***********/

/************clickoutside start***********/
export const useClickOutside = (elementRef, setActiveState) => {
  useEffect(() => {
    const outsideHandler = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target)) {
        setActiveState(false);
      }
    };

    // Add a click event listener to the document
    document.addEventListener("click", outsideHandler);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", outsideHandler);
    };
  }, [elementRef]);
};
/************clickoutside end***********/

/************Skeleton start***********/
// export const SkeletonLoading = ({count=8, marginTop, marginBottom}) => {
//   const style = {
//     marginTop: marginTop,
//     marginBottom: marginBottom,
//   };
//   return (
//     <div  style={style} className={styles.skeletonLoadingMain}>
//       {new Array(count).fill("").map((v, i) => (
//         <div key={i} className={styles.skeletonLoading}>
//           <span className={styles.skeletonLoader}></span>
//         </div>
//       ))}
//     </div>
//   );
// };
/************Skeleton end***********/

/************Skeleton start***********/
export const SkeletonLoading = ({count}) => {
  return (
    <div className={styles.skeletonLoadingMain}>
      {new Array(count || 8).fill("").map((v, i) => (
        <div key={i} className={styles.skeletonLoading}>
          <span className={styles.skeletonLoader}></span>
        </div>
      ))}
    </div>
  );
};
/************Skeleton end***********/

/************DataNotFounds start***********/
export const DataNotFounds = () => {
  return (
    <div className={styles.dataNotFoundMain}>
      <label>
        <HiExclamationCircle />
        {/* <img src={process.env.PUBLIC_URL + "/images/error.png"} alt="" /> */}
      </label>
      <h3>
        Data not found <span></span>
      </h3>
    </div>
  );
};
/************DataNotFounds end***********/

/************DataNotFounds start***********/
export const SkeletonNotFound = ({marginTop, marginBottom, count=8}) => {
  const [isLoad, setIsLoad] = useState(false);
  const style = {
    marginTop: marginTop,
    marginBottom: marginBottom,
  };
  useEffect(() => {
    var timer = setTimeout(() => {
      setIsLoad(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={style} className={styles.skeletonNotFound}>
      {!isLoad ? <SkeletonLoading count={count} /> : <DataNotFounds />}
    </div>
  );
};
/************DataNotFounds end***********/


/************Skeleton start***********/
export const SelectBoxHead = ({ title = "Select...", children }) => {
  return (
    <div
      className={`${styles.selectBoxHead} ${
        title ? styles.isSelected : styles.isNotSelected
      }`}
    >
      {title && <label>{title}</label>}
      {children}
    </div>
  );
};
/************Skeleton end***********/
