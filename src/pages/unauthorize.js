
import React from 'react';
import styles from "./page.module.scss";
import ButtonGlobal from '@/component/ButtonGlobal';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '@/utils/cookies';
import { Logo } from '@/component/Assets/Library';
import Image from 'next/image';
import error from "../../public/images/plug.png"

const UnauthorizePage = ({ statusCode }) => {
    const router = useRouter()
  return (

    <div className={styles.errorPageCont}>
    <Logo black />
     <aside>
     <Image src={error} alt="" />
          {/* <h2>Oops! something went wrong</h2> */}
          <h3>You are not authorized to view this page.</h3>
          <ButtonGlobal width='auto' title="Please login again" onClick={()=> {
              deleteAllCookies();
              router.push("/")}} />
     </aside>
  </div>
  );
};

export default UnauthorizePage;
