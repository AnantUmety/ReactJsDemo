import React,{useState, useEffect} from "react";
import styles from "./report.module.scss";
import Table from "@/component/Table";
import {GoCheckCircle} from "react-icons/go"
import {AiOutlineCloseCircle} from "react-icons/ai"
import globe from "../../../public/images/global/globe.svg"
import device from "../../../public/images/global/device.svg"
import Image from "next/image";

const ScoreCard =(props)=> {

  const polynomials = [
    {
      attempt: [
        true,
        true,
        true,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
      ],
    },
    {
      attempt: [
        true,
        true,
        false,
        true,
        true,
        true,
        true,
        true,
        false,
        true,
        true,
      ],
    },
    {
      attempt: [
        true,
        true,
        true,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
    {
      attempt: [
        true,
        true,
        true,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
    {
      attempt: [
        true,
        true,
        true,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
   
  ];

  const maxAttemptLength = Math.max(
    ...polynomials.map((item) => item.attempt.length)
  );
  const uniqueNumbers = Array.from(
    { length: maxAttemptLength },
    (_, i) => i + 1
  );

  const questionFunc =(row)=>{
    return <div className={styles.questions}>
      <span className={styles.checkeds}><GoCheckCircle />  10</span> <span><AiOutlineCloseCircle /> 1</span>
    </div>
  }

  const sourceFunc =(row)=>{
    return <Image width={28} height={28} src={row?.source} alt="" />
  }

  const data = [
    {
      id: 1,
      attempt: "05",
      attemptedDate: "May 02 2023, 03:14:24 GMT+05:30",
      score: "80%",
      question: "Fri, Jun 17 2022, 23:44",
      source: device,
    },
    {
      id: 2,
      attempt: "04",
      attemptedDate: "May 02 2023, 03:14:24 GMT+05:30",
      score: "80%",
      question: "Fri, Jun 17 2022, 23:44",
      source: globe,
    },
    {
      id: 3,
      attempt: "03",
      attemptedDate: "May 02 2023, 03:14:24 GMT+05:30",
      score: "80%",
      question: "Fri, Jun 17 2022, 23:44",
      source: globe,
    },
    {
      id: 4,
      attempt: "02",
      attemptedDate: "May 02 2023, 03:14:24 GMT+05:30",
      score: "80%",
      question: "Fri, Jun 17 2022, 23:44",
      source: globe,
    },
    {
      id: 5,
      attempt: "01",
      attemptedDate: "May 02 2023, 03:14:24 GMT+05:30",
      score: "80%",
      question: "Fri, Jun 17 2022, 23:44",
      source: globe,
    },
  ];

  const columns = [
    {
      Header: "Attempt",
      accessor: "attempt",
      Cell: (props) => {
        return (
          <b className={styles.weight600}>{props.cell.value}</b>
        );
      },
      arrow: true,
    },
    {
      Header: "Attempted date",
      accessor: "attemptedDate",
      arrow: true,
    },
    {
      Header: "Score",
      accessor: "score",
      arrow: true,
    },
    {
      Header: "Question",
      accessor: questionFunc,
      arrow: true,
    },
    {
      Header: "Source",
      accessor: sourceFunc,
      arrow: true,
    }
  ];

  return (
    <div className={styles.scoreCardDv}>
      <hgroup className={styles.hgroups}>
        <h1>
          <span>Topic</span>Zeros and Factors of Polynomials
        </h1>
        <h2>
          No of total attempt : <b>5</b>
        </h2>
      </hgroup>


      <div className={styles.polynomialsQuiz}>
        {polynomials && (
          <section>
            {polynomials
              .slice()
              .reverse()
              .map((item, ind) => {
                return (
                  <aside key={ind}>
                    <h4>Attempt {polynomials.length - ind}</h4>
                    <ul>
                      {item?.attempt.map((v, i) => {
                        return (
                          <li>
                            <button
                              style={{ background: v ? "#36B37E" : "#FF5630" }}
                            ></button>
                          </li>
                        );
                      })}
                    </ul>
                  </aside>
                );
              })}
            <ol className={styles.olList}>
              {uniqueNumbers.map((number) => (
                <li key={number}>Q{number}</li>
              ))}
            </ol>
          </section>
        )}

        <hgroup>
           <h4>Last score <b>80%</b></h4>
           <h4>Avg. score <b>63%</b></h4>
        </hgroup>
      </div>

      <Table
        className={styles.learnTop}
        data={data}
        assets={true}
        columns={columns}
      />
    </div>
  );
}

ScoreCard.propTypes = {};

export default ScoreCard;
