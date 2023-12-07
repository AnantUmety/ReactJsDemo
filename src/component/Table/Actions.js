import { useState } from "react";
import styles from "./tb.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";

export const Actions = ({ data, onClicked, active, handleAction }) => {
  const clickHandler = () => {
    onClicked(!active);
  };

  return (
    <div className={styles.actions}>
      <button onClick={() => clickHandler()}>
        <BsThreeDotsVertical />
      </button>
      {active && (
        <ol>
          {data.map((item, ind) => {
            return (
              <>
                {item != "" && (
                  <li key={ind}>
                    <button onClick={handleAction[ind]}>{item}</button>
                  </li>
                )}
              </>
            );
          })}
        </ol>
      )}
    </div>
  );
};
