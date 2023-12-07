import React,{useEffect} from "react";
import styles from "./buttonGlobal.module.scss"
import classnames from 'classnames';
import Image from "next/image";

const ButtonGlobal = ({type="", title="Text Hera", width="full", radius="full", size="", bgColor="", className="", disable=false, onClick, children, icon={}, isMobile, greenRadius}) => {
    return (
        <div  
         className={classnames({
            [styles.buttonGlobalMain]: true,
            [className]: className,
            [styles[width]]: width,
            [styles.disableClass] : disable,
            [styles[size]]: size,
            [styles[radius]]: radius,
            [styles[bgColor]]: bgColor,
            [styles[(icon?.align === "right" || icon?.align === "center") ? icon?.align : "left"]]: icon && icon?.src,
            [styles.isMobileBtn]:isMobile,
            [styles.greenRadius] : greenRadius
          })} 
          >
          <button type={type ? type : "button"} {...(onClick ? { onClick } : {})}>
            {children ? <> {children} {title}</> : 
            <span>{icon && icon?.src && <b><Image src={icon?.src} alt="" width={16} height={16}/></b>}{title}</span>}
          </button>
        </div>
    )
}

export default ButtonGlobal;

// title = "" Add title for button text,
// width = (bydefault full width is 100% ) If you want to manage width to use these propertys like half, auto and quarter
// className = If you modify button different style to use this property className={styles.abc}
// disable = use this property for disable Btn
// size = varients small, mediun (bydefault) and large 
// bgColor = (bydefault is blue) add property green, gray, border and red, transparentBlack and transparentWhit cover 0.5;  
// bgColor = shadow provide small and top light shadow buttton

// icon = have tow property icon={ src: "", align: bydefault is left || right }  Example icon={{src:lcIcon, align: "left"}}
//border-radius have three option bydefault full medium 8px and none 0px

// greenRadius for small green button
//borderBlue for bluse border


