
import React, { Fragment } from 'react'
import styles from "./login.module.scss";

export const LoginTab = ({data, tabState, setTabState}) => {
    const tabHandler=(id)=>{
        setTabState(id)
    }
  return (
    <ol className={styles.tabList}>
        {data?.map((item, ind)=>{
            return(
                <li className={tabState === ind && styles.activated} key={ind}><button onClick={()=> tabHandler(ind)}>{item.title}</button></li>
            )
        })}
    </ol>
  )
}


export const LoginContent = ({children, tabState, index}) => {
  return (
    <Fragment>
      {(tabState == index) && <div className={styles.loginContent}>
          {children}
      </div>}
    </Fragment>
    
  )
}
