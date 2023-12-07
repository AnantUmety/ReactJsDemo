import React from 'react'
import styles from "./layout.module.scss"
import classnames from 'classnames';
import Sidebar from './Sidebar';
import { FooterSecondry } from '../Footer';
import dashboard from "../../../public/images/navigation/dashboard.png"
import peopleLine from "../../../public/images/navigation/peopleLine.png"
import tab from "../../../public/images/navigation/tab.png"
import order from "../../../public/images/navigation/order.png"
import notification from "../../../public/images/navigation/notification.png"
import settings from "../../../public/images/navigation/settings.png"
import user from "../../../public/images/navigation/milo2.png"

  const Layout = ({ children, center, bgBlack, hideHeaderFooter, hideHeader, hideFooter, sidebarSmall, sidebarMedium, innerSidebars, rightSideBar, bgColor="", smallPadding }) => {

    const menuData =
    [{title: "Dashboard", url: "/d", icon: dashboard}, 
     {title: "People Line", url: "/d", icon: peopleLine},
     {title: "Tab", url: "/d", icon: tab},
     {title: "Order", url: "/d", icon: order},
    //  {title: "Notification", url: "/d", icon: notification, move: true},
     {title: "Settings", url: "/d", icon: settings},
     {title: "Settings", url: "", icon: user},
   ]

    return(
        <div 
        className={classnames({
            [styles.layoutCntr]: true,
            [styles.leftSidebar]: sidebarSmall,
            [styles.leftSidebarMedium]: sidebarMedium,
            [styles.innerSidebars]: innerSidebars,
            [styles.innerSidebarsRight]: (innerSidebars && rightSideBar),
            [styles.rightSideBar]: (innerSidebars) ? false : rightSideBar,
            [styles.bgBlack]: bgBlack,
            [styles.verticalCenter]: center,
            [styles.hideHeaderFooter]: hideHeaderFooter,
            [styles[bgColor]] : bgColor,
            [styles.smallPaddingDv] :smallPadding 
        })}
        >
           {(sidebarSmall || sidebarMedium || innerSidebars) && <Sidebar data={menuData}
          />}
            <div data-attr="layoutCntrMiddle" 
             className={classnames({
              [styles.layoutCntrMiddle]: true,
              [styles[bgColor]] : bgColor
          })}
            >
                {children}
            </div>
           {/* {(!hideHeaderFooter) && !hideFooter && <FooterSecondry />}  */}
        </div>
    )
  };

export default Layout;

// Please folow these structur to manage layout: 
// 1. {sidebarSmall (80px width) or sidebarMedium (230px width )} By adding the sidebar prop, you will be able to achieve a left sidebar layout.
// 2. {innerSidebars} Adding the innerSidebars prop, you will able to achieve a both left and right sidebar.

// 4. {hideHeader} Hide header
// 5. {hideFooter} Hide Footer
// 6. {hideHeaderFooter} Hide Footer
// 7. {center} box set in vertically center