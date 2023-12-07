
import ButtonGlobal from '@/component/ButtonGlobal';
import InputFields from '@/component/inputFields/InputFields';
import React from 'react'
import styles from "./login.module.scss";
import gplus from "../../../public/images/preLogin/g.png"
import cl from "../../../public/images/preLogin/cl.png"
import classnames from 'classnames';

export default function Loginbtns() {
  return (

        <div className={styles.btnLists}>
            <ButtonGlobal size="small" className={styles.gButton} icon={{src: gplus, align: "center"}} title="Google" bgColor='border' />
            <ButtonGlobal size="small"
              className={classnames({
                [styles.gButton]: true,
                [styles.gBtns]: true,
              })}
             icon={{src: cl, align: "center"}} title="Clever" bgColor='border' />
        </div>

  )
}
