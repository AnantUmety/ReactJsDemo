
import ButtonGlobal from '@/component/ButtonGlobal';
import InputFields from '@/component/inputFields/InputFields';
import React from 'react'
import styles from "./login.module.scss";
import { useTranslation } from "next-i18next";


export default function LoginSchool({setIsSchoolSelected}) {
  const { t: langTrans } = useTranslation();
  const submitHandler =()=>{
    setIsSchoolSelected(true)
  }
  return (
    <div className={styles.loginSchoolcntr}>
      <form onSubmit={submitHandler}>
        <ul>
          <li>
            <InputFields
              placeholder={langTrans('login.enterYourSchool')}
              onChange={() => console.log("dsvdgc")}
            />
          </li>
          <li>
            <ButtonGlobal type="submit" size="medium" title="Continue" />
          </li>
        </ul>
        </form>
    </div>
  )
}
