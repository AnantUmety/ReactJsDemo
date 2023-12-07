import styles from "./delete.module.scss"
import React from 'react'
import ButtonGlobal from '../ButtonGlobal'

const DeleteBox =({heading="Delete", subHeading="Are you sure you want to delete?", setIsdelete})=> {
  return (
    <div className={styles.deleteBox}>
        {heading && <h2>{heading}</h2>}
        {subHeading && <h3>{subHeading}</h3>}
        <aside>
           <ButtonGlobal title="Cancel" onClick={()=> setIsdelete(false)} width="auto" /> 
           <ButtonGlobal bgColor="red" onClick={()=> console.log("delete")} title="Delete" width="auto" />
        </aside>
    </div>
  )
}

export default DeleteBox