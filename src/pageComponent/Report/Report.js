import React, { Fragment, useState, useEffect } from "react";
import { BackBtn, HeadingBox } from "@/component/Assets/Elements";
import { Button, Grid } from "@mui/material";
import info from "../../../public/images/global/info.svg";
import Image from "next/image";
import styles from "./report.module.scss";
import { TabContainer, TabHeader } from "@/component/Tabbing/Tab";
import Table from "@/component/Table";
import { IoCalendarOutline } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import ModalGlobal from "@/component/ModalGlobal";
import ScoreCard from "./ScoreCard";

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Report = (props) => {
  const [isTabOpen, setIsTabOpen] = useState(0);
  const [isScore, setIsScore] = useState(false)
  const [showChart, setShowChart] = useState(false);

  const options2 = {
    chart: {
      type: 'donut',
    },
    labels: ['260 modules', '110 modules', '12 modules', '6 modules'], 
    colors: ["#DFE1E6", "#36B37E", "#FFC400", "#DE350B"],
    plotOptions: {
      pie: {
        donut: {
          size: '50%',
        },
        dataLabels: {
          enabled: false,
        },
        borderWidth: 0,
      },
    },
    dataLabels: {
      enabled: false, 
    },
    borderWidth: 0,
    legend: {
      show: false, 
    },
  };

  const series2 = [260, 110, 12, 6]; 

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowChart(true);
    }
  }, []);

  const graphData = [
    { title: "Remaining", count: "260 modules", color: "#DFE1E6" },
    { title: "Mastered", count: "110 modules", color: "#36B37E" },
    { title: "Learning", count: "12 modules", color: "#FFC400" },
    { title: "Struggling", count: "6 modules", color: "#DE350B" },
  ];

  const dataTab = [
    { title: "All" },
    { title: "Mastered" },
    { title: "Learning" },
    { title: "Struggling" },
  ];

  const data = [
    {
      id: 1,
      module: "Poliovirus",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 2,
      module: "Excretory System",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 3,
      module: "Waves in Matter",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 4,
      module: "Waves and Particles",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 5,
      module: "Polarization of Light",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 6,
      module: "Cardiac Cycle",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 7,
      module: "Parts of Digestive System",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
    {
      id: 8,
      module: "Action Potential",
      subject: "Chemistry",
      attempts: 4,
      lastAttempt: "Fri, Jun 17 2022, 23:44",
      LastScore: "80% (8/10)",
      avgScore: "65%",
    },
  ];

  const buttonFunc = () => {
    return (
      <button>
        <GrFormNext />
      </button>
    );
  };

  const columns = [
    {
      Header: "Module",
      accessor: "module",
      Cell: (props) => {
        return (
          <>
            <span
              className={styles.spanBgs}
              style={{ background: "#FFC400" }}
            ></span>
            {props.cell.value}
          </>
        );
      },
      canSort: true,
    },
    {
      Header: "Subject",
      accessor: "subject",
      canSort: true,
    },
    {
      Header: "No. of attempts",
      accessor: "attempts",
      canSort: true,
    },
    {
      Header: "Last attempt",
      accessor: "lastAttempt",
      Cell: (props) => {
        return (
          <span className={styles.ioCland}>
            <IoCalendarOutline />{props.cell.value}
          </span>
        );
      },
      canSort: true,
    },
    {
      Header: "Last score",
      accessor: "LastScore",
      Cell: (props) => {
        return (
          <button onClick={()=> setIsScore(!isScore)} className={styles.linking} legacyBehavior>
            {props.cell.value}
          </button>
        );
      },
    },
    {
      Header: "Avg. Score",
      accessor: "avgScore",
      arrow: true,
    },

    {
      Header: " ",
      accessor: buttonFunc,
      arrow: true,
    },
  ];


  return (
    <Fragment>
    <div className={styles.reportDiv}>
      <BackBtn />
      <HeadingBox title="Report of STEM" />

      <Grid container>
        <Grid item xs={12} className={styles.helloStu}>
          <h3>
            Hello, student <span>Here’s is your leanring progress report</span>
          </h3>

          <div className={styles.showChartBoxUp}>
          <ul className={styles.stuData}>
            {graphData?.map((item, ind) => {
              return (
                <li key={ind}>
                  <i style={{ background: item?.color }}></i>
                  {item?.title} <Image src={info} alt="" /> <b>{item?.count}</b>{" "}
                </li>
              );
            })}
          </ul>

          {showChart && (
          <div className={styles.showChartBox}>
            <h5><b>128</b> Completed</h5>
             <Chart options={options2} series={series2} type="donut" height={240}  />
          </div>
        )}
        </div>
        </Grid>

        <Grid item xs={12} className={styles.helloStu}>
          <h3>Learning</h3>
          <TabHeader
            isOpen={isTabOpen}
            setIsOpen={setIsTabOpen}
            black
            data={dataTab}
          />
          <TabContainer value={0} isOpen={isTabOpen}>
            <Table
              className={styles.learnTop}
              rightSearch
              data={data}
              columns={columns}
            />
          </TabContainer>
          <TabContainer value={1} isOpen={isTabOpen}>
          <Table
              className={styles.learnTop}
              rightSearch
              data={data}
              columns={columns}
            />
          </TabContainer>
          <TabContainer value={2} isOpen={isTabOpen}>
          <Table
              className={styles.learnTop}
              rightSearch
              data={data}
              columns={columns}
            />
          </TabContainer>
          <TabContainer value={3} isOpen={isTabOpen}>
          <Table
              className={styles.learnTop}
              rightSearch
              data={data}
              columns={columns}
            />
          </TabContainer>
        </Grid>
      </Grid>
    </div>

    {isScore && <ModalGlobal activeState={isScore} onClick={setIsScore} width="full">
            <ScoreCard />
    </ModalGlobal>}
    </Fragment>
  );
};

Report.propTypes = {};

export default Report;
