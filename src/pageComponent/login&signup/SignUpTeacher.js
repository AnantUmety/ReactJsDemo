
import InputFields from "@/component/inputFields/InputFields";
import React from "react";
import styles from "./login.module.scss";
import {useState} from "react"
import ButtonGlobal from "@/component/ButtonGlobal";

export const SignUpTeacher = () => {
  const [first, setfirst] = useState(false)
  return (
    <div className={styles.signStudent}>
      <form>
        <ul>
            <li><InputFields placeholder="Enter teacher code *" onChnage={()=> console.log("dshj")} /></li>
            <li><InputFields placeholder="First name *" onChnage={()=> console.log("dshj")} /></li>
            <li><InputFields placeholder="Last name *" onChnage={()=> console.log("dshj")} /></li>
            <li><InputFields placeholder="Email Address *" onChnage={()=> console.log("dshj")} /></li>
            <li><InputFields placeholder="Username *" onChnage={()=> console.log("dshj")} /></li>
            <li><InputFields type="password" placeholder="Password *" onChnage={()=> console.log("dshj")} /></li>
            <li><ButtonGlobal className={styles.signBtn} title="Sign up" /></li>
        </ul>
      </form>
    </div>
  );
};
