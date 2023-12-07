import React from 'react'
import styles from "./tb.module.scss"
export const Status = ({status}) => {
  return (
    <button className={`${styles[status]} statusBtns`}>{status}</button>
  )
}
