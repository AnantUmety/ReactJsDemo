import { WhiteBox } from "@/component/Assets/Elements";
import { Logo } from "@/component/Assets/Library";

import React from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import { useState } from "react";
import { SignUpStudent } from "./SignUpStudent";
import { LoginTab, LoginContent } from "./LoginTab";
import Loginbtns from "./Loginbtns";
import { SignUpTeacher } from "./SignUpTeacher";

export const SignUp = () => {
  const [tabState, setTabState] = useState(0);
  const tabData = [
    { id: 1, title: "Sign up as Student" },
    { id: 2, title: "Sign up as Teacher" },
  ];
  return (
    <div className={styles.signupBoxUp}>
      <Logo />
      <WhiteBox noPadding className={styles.signupBox}>
        <LoginTab
          tabState={tabState}
          setTabState={setTabState}
          data={tabData}
        />
        <LoginContent tabState={tabState} index={0}>
          <SignUpStudent />
        </LoginContent>

        <LoginContent tabState={tabState} index={1}>
          <SignUpTeacher />
        </LoginContent>

        <LoginContent>
          <h4>
            <span>or Login with</span>
          </h4>
          <Loginbtns />
          <h5>
            Already have an account? <Link href="/">Login</Link>
          </h5>
          <h6>
            By continuing, you're confirming that you've read our{" "}
            <Link href="">Terms of Use</Link> and{" "}
            <Link href="">Privacy Policy</Link>
          </h6>
        </LoginContent>
      </WhiteBox>
    </div>
  );
};
