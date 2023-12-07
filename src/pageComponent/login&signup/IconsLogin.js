
import React from 'react'
import styles from "./login.module.scss";
import home from "../../../public/images/preLogin/home.png"
import Image from 'next/image';
import Link from 'next/link';
import classnames from 'classnames';

export default function IconsLogin({src, title}) {
  return (
    <div 
    className={classnames({
      [styles.iconsLogin]: true,
      [styles.titleList]: title,
    })} 
    >
        <Image src={src || home} alt="" />
        {title && <hgroup>{title} <Link href="/">Not your school?</Link></hgroup>}
    </div>
  )
}
