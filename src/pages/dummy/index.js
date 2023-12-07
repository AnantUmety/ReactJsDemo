import Layout from "@/component/Layout";
import styles from "./dummy.module.scss";
const Dummy = () => {
  return (
    <Layout bgBlack>
      <div className={styles.ads}></div>
      <div id={styles.myid}></div>
    </Layout>
  );
};

export default Dummy;
