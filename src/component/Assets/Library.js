import Link from "next/link";
import styles from "./assets.module.scss";
import Image from "next/image";
import classnames from "classnames";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, useRef } from "react";
import { useTranslation } from "next-i18next";

import arrowRight from "../../../public/images/arrowRight.png";
import globe from "../../../public/images/globe.png";
import {IoCloseOutline} from "react-icons/io5"
import { BsFillArrowUpCircleFill } from "react-icons/bs";

/****logo logo start****/
export const Logo = ({black}) => {
  return (
    <div className={styles.logoCntr} attr-data="logoCntr">
      <Link href="/">
       Dummy
      </Link>
    </div>
  );
};

/****header BrowseLibrary button start****/
export const BrowseLibrary = () => {
  const { t: langTrans } = useTranslation();
  return (
    <div className={styles.browseLibraryCntr} attr-data="browseLibraryCntr">
      <Link href="/">
        <span>{langTrans("header.browseLibrary")}</span>{" "}
        <b>
          <Image src={arrowRight} alt="" />
        </b>
      </Link>
    </div>
  );
};

/**** parent box (use for childrens right left center space-between) start****/
export const ParentBox = ({ children, className, align }) => {
  return (
    <div
      className={classnames({
        [styles.parentBox]: true,
        [className]: className,
        [styles[align]]: align
      })}
      attr-data="parentBox"
    >
      {children}
    </div>
  );
};
//(ParentBox) align left right center bydefault is space-between



/**** useResponsive Breakpoints  start****/
export const useResponsiveBreakpoints = () => {
  const theme = useTheme();
  const isMobileDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileUp = useMediaQuery(theme.breakpoints.up("sm")); //600
  // const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); 1200
  const isTabletDown = useMediaQuery(theme.breakpoints.down("md")); // 900
  const isTabletUp = useMediaQuery(theme.breakpoints.up("md")); // 900
  const isDesktop = useMediaQuery(theme.breakpoints.up("xl")); //1536px
  return { isMobileDown, isMobileUp, isTabletDown, isTabletUp, isDesktop };
};
// this is also work : <Grid item xs={12} sx={{ display: { sm: 'none', md: 'block'} }} ></Grid>

/**** languageSelector  start****/
export const UseLanguageSelector = ({ className }) => {
const history = useRouter();
  const [labelText, setLabelText] = useState(history?.locale);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const langRef = useRef(null)
  const language = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
  ];

  const languageHandler = (val) => {
    setLabelText(val);
    setIsDropDown(false); // Close the dropdown when a language is selected

    if (val === "ar") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }

    history.push(history.route, history.asPath, {
      locale: val,
    });
  };

  const buttonHandler = () => {
    setIsDropDown(!isDropDown);
  };

  useEffect(() => {
    if (isRtl) {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }

    return () => {
      // Clean up the dir attribute only if it was set by this component
      if (!document.documentElement.hasAttribute("dir")) {
        document.documentElement.removeAttribute("dir");
      }
    };
  }, [isRtl]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef?.current && !langRef.current.contains(e.target)) {
        setIsDropDown(false);
      }
    };
  
    window.addEventListener("click", handleClickOutside);
  
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [langRef, setIsDropDown]);
  

  // Check if the current route has the locale parameter
  useEffect(() => {
    const locale = history?.locale;
    if (locale === "ar") {
      setIsRtl(true);
    } else {
      setIsRtl(false);
    }
  }, [history?.locale]);

  return (
    <Fragment>
      <div ref={langRef} className={styles.languagesCntr} attr-data="languagesCntr">
        <button
          onClick={buttonHandler}
          className={classnames({
            [styles.buttonCntr]: true,
            [className]: className,
            [styles.active]: isDropDown,
          })}
        >
          <Image src={globe} alt="" />
          {labelText}
          <em></em>
        </button>
        {isDropDown && (
          <ul>
            {language.map((i, v) => {
              return (
                <li key={i.value}>
                  <button
                    className={i.value == labelText && styles.active}
                    onClick={() => languageHandler(i.value)}
                  >
                    {i.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Fragment>
  );
};


/****Useheading (carousel card heading) start****/
export const UseHeading =({title, url, children, className})=>{
  return(
    <div 
    className={classnames({
      [styles.titleCntr]: true,
      [className]: className,
    })}>
        <hgroup className={styles.titleCntrHead}>{title && <h2>{title}</h2>} {url && <Link href={url}>View all</Link>}</hgroup>
        <div className={styles.titleCntrIn}>{children}</div>
    </div>
  )
 }
/****useheading end****/

/****SkipButton (skip button ) start****/
export const SkipButton =({title, className, onClick})=>{
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return(
    <button 
    onClick={handleButtonClick} 
    className={classnames({
      [styles.skipButtonCntr]: true,
      [className]: className,
    })}
    >
      <b>{title}</b> <span><IoCloseOutline /></span>
    </button>
  )
 }
/****useheading end****/


/****videoPlayer start****/
export const VideoPlayer =({className, absolute, src})=>{
  return(
    <div 
    className={classnames({
      [styles.videoPlayerDiv]: true,
      [className]: className,
      [styles.absoluteVideo] : absolute
    })}
    >
      <video
        autoPlay
        controls={false}
        muted 
        loop
        >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

/****videoPlayer end****/

/****CheckBox start****/
export const CheckBox = ({ title, className, width, checked, disable, onChange, alignText, ...props }) => {
  return (
    <label
      className={classnames({
        [styles.checkGlb]: true,
        [className]: className,
        [styles[width]]: width,
        [styles.isTitle]: title,
        [styles.isDisable]: disable,
        [styles.alignLeft] : alignText === "left"
      })}
      attr-data="checkGlb"
    >
      <input type="checkbox" checked={checked} onChange={onChange} {...props} />
      <small className={styles.checkboxDesign}></small>
      {title && <em className={styles.checkboxLabel}>{title}</em>}
    </label>
  );
};

//title = add checkbox title
// width bydefault is auto, use full to 100%
// className customize your checkbox
// disable = to disable box
/****CheckBox end****/

/****BackToTop start****/
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`${styles.backtop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <BsFillArrowUpCircleFill />
    </button>
  );
};
/****BackToTop end****/
