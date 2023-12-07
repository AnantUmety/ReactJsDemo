import React,{useEffect, useRef, useState} from "react";
import styles from "./modalGlobal.module.css"
import classnames from 'classnames';
import cross from "../../../public/images/global/cross.png";
import Image from "next/image";

const ModalGlobal = ({ children, onClick, activeState, outSideClick = true, hideCloseButton = false, heading="", className, width="small" }) => {
    const modalRef = useRef(null);
    const [isFullHeight, setIsFullHeight] = useState(false);

    const handleClickInside = e => {
        if ((e.target === e.currentTarget && !hideCloseButton)) {
            // !outSideClick ? "" : onClick()
        }
    };

      useEffect(() => {
        setIsFullHeight(modalRef?.current?.scrollHeight >= window?.innerHeight - 140);

      }, []);

    
    useEffect(() => {
        document.body.classList.toggle(styles.modalActive, activeState);
        return () => {
            document.body.classList.toggle(styles.modalActive, null);
        }
    }, [activeState])

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27 && !hideCloseButton) {
                onClick();
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])


    return (
        <div  
     
         className={classnames({
            [styles.modalGlobalMain]: true,
            [className]: true,
          })} 
          id="pinPopupIdentifier"
          onClick={handleClickInside}>
            <div 
                className={classnames({
                    [styles.modalGlobalMainIn]: true,
                    [styles[width]]: true,
                 
                  })}
            >
                <div 
                ref={modalRef}
                className={classnames({
                    [styles.modalGlobalContent]: true,
            
                  })}
                >
                       {heading && <h2>{heading} </h2>}
                        {!hideCloseButton &&
                            <button className={styles.mgClose} onClick={()=> onClick()}>
                               <Image src={cross} alt="" />
                                </button>
                        }
                        {children}
                </div>
            </div>
        </div>
    )
}

export default ModalGlobal;

// onClick = Pass false state to close outside and esc.  Example  onClick={() => setIsSignUp(false) }
// activeState = Pass active state to get active value Example = activeState={isSignup}
// hideCloseButton = If you want to hide close button to pass hideCloseButton={true} 
// width = There are four option extra Small(xs): 360 small: 480, medium: 700, large:900, extraLarge: 1100 and full: 100% Example by default show small width="small" 
// className = If You want to customize yout modal to add class Example className={styles.abc}
// heading = Pass heading text here.
// outSideClick == if you want not hide popup to use outSideClick={false}
