
import { Button } from "@mui/base";
import classnames from "classnames";
import Link from "next/link";
import ButtonGlobal from "../ButtonGlobal";
import styles from "./footer.module.scss"
import round from "../../../public/images/round.png"

export const Footer =({className})=>{
    return(
        <div
        className={classnames({
            [styles.footerCntr]: true,
            [className]: className,
          })}
        >
          <ul>
              <li><Link href="">About</Link></li>
              <li><Link href="">Helpcenter</Link></li>
              <li><Link href="">Feedback</Link></li>
              <li><Link href="">Provider portal</Link></li>
          </ul>
          <p>&copy; 2023, Dummy Pvt Ltd.</p>
          <ButtonGlobal bgColor="shadow" width="auto" icon={{src: round}} title="Need help?"></ButtonGlobal>
        </div>
    )
}

export const FooterSecondry =({className})=>{
  return(
      <div
      className={classnames({
          [styles.footerCntr]: true,
          [className]: className,
        })}
        data-attr="footerCntr"
      >
        <ul>
            <li><Link href="">Privacy Policy</Link></li>
            <li><Link href="">Terms of use</Link></li>
            <li><Link href="">Contact us</Link></li>
        </ul>
        <p>&copy; Copyright 2023 Dummy. All rights reserved.</p>
      </div>
  )
}