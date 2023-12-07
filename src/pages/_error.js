import Image from 'next/image';
import React from 'react';
import styles from "./page.module.scss";
import error from "../../public/images/plug.png"
import ButtonGlobal from '@/component/ButtonGlobal';
import { useRouter } from 'next/router';
import { Logo } from '@/component/Assets/Library';

const ErrorPage = ({ statusCode }) => {
    const router = useRouter()
  return (
    <div className={styles.errorPageCont}>
      <Logo black />
       <aside>
       <Image src={error} alt="" />
            <h2>Oops! something went wrong</h2>
            <h3>the page you were looking for doesn’t exist</h3>
            <ButtonGlobal width='auto' title="Go back" onClick={()=> router.push("/")} />
       </aside>
    </div>
  );
};

export default ErrorPage;
