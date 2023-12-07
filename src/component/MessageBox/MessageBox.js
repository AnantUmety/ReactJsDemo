
import styles from "./message.module.scss"
import classnames from 'classnames';
import Image from "next/image";
import exclamationMark from "../../../public/images/exclamationMark.png";
import {useEffect, useState} from "react"

export const ErrorBox =({title, align= "left", className="", icon, bg})=> {
    return(
        <>
        {title && <cite 
          className={classnames({
            [styles.errorBox]: true,
            [className]: className,
            [styles[align]]: align,
            [styles.backgroundRed]: bg
          })} >{icon && <b><Image src={icon} alt="" /></b>} {bg && <em><Image src={exclamationMark} alt="" /></em>}{title}</cite>}
        </>
    )
}

// title = add title here
// align = center and right pass to center and right text, align left is bydefault 
// className = If you modify button different style to use this property className={styles.abc}
// icons = pass image path 


export const SuccessBox = ({ title="Add Title", align = 'left', className = '', icon, children }) => {
  return (
    <>

        <cite
          className={classnames({
            [styles.successBox]: true,
            [className]: className,
            [styles[align]]: align,
          })}
          attr-data="successBox"
        >
          {icon && <b><img src={icon} alt="" /></b>}
          {title} 
          {children}
        </cite>
    </>
  );
};


export const ErrorBoxRed =({title, className="", timeOut = 5000, status = true })=> {
  const [showBox, setShowBox] = useState(status);

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowBox(false);
    }, timeOut);

    return () => clearTimeout(timer);
  }, []);

  return(
      <>
      {title && <cite 
        className={classnames({
          [styles.backgroundRed]: true,
          [styles.errorBox]: true,
          [className]: className,
          [styles.fadeOut] :!showBox
        })} ><em><Image src={exclamationMark} alt="" /></em>{title}</cite>}
      </>
  )
}




