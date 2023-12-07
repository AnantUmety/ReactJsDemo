
import React from 'react'
import PropTypes from 'prop-types'
import styles from "./orderDetail.module.scss"
import illustration from "../../../public/images/global/illustration.png"
import Image from 'next/image'
import InputFields from '@/component/inputFields/InputFields'
import ButtonGlobal from '@/component/ButtonGlobal'
function LeaveComment(props) {
  return (
    <div className={styles.leaveCommentDiv}>
        <label><Image src={illustration} alt="" /></label>
        <h3>Leave your comment</h3>
        <InputFields className={styles.textClass} fieldname="textarea" placeholder="Comment..." />
        <ButtonGlobal width='auto' title="Submit" disable />
    </div>
  )
}

LeaveComment.propTypes = {}

export default LeaveComment
