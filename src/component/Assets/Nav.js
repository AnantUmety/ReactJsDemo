import styles from "./elements.module.scss";

import Image from "next/image";
import {GoHome} from "react-icons/go"
import {BiSearch} from "react-icons/bi"
import {AiOutlineUnorderedList} from "react-icons/ai"
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next'
import starFilled from "../../../public/images/global/starFilled.png"
import vidPlay from "../../../public/images/global/vidPlay.png"
import { useState } from "react";

export const Nav =()=>{
    const router = useRouter()
    const { t: langTrans } = useTranslation();
    const [isOpen, setIsOpen] = useState(false)


    const modulesList = [
        {title: "All modules", count: 112,
        subItems: [
            {title: "dummy modules", count: 100, src: starFilled,  url: "/1"},
            {title: "Others", count: 12, src: vidPlay,  url: "/2"},
          ],
        },
   
    ]

    const labelList = [
        {title: "Quarter 1", color: "#9FAEFF",
        subItems: [
            { title: "Module 1", url: "/1"},
            { title: "Module 2", url: "/2"},
          ],
         },
        {title: "Quarter 2", url: "/q2", color: "#FFA4A4"},
       
    ]

    const activeMenu =(path)=>{
        return (router.pathname === path) ? styles.menuActive : styles.notActive;
    }

    const menuHandler =(id)=>{
        if(id === isOpen){
            return setIsOpen(null)
        }
        setIsOpen(id)
    }

    return(
        <div className={styles.navigationCntr}>
            <h2>Modules</h2>
            <ul className={styles.menuTop}>
                {modulesList.map((item, ind)=>{
                    return(
                        <li className={styles.downMenu} key={ind}>
                            <a href={item?.url ? item?.url : null}>{item?.title} <span>{item?.count}</span></a>
                            {item?.subItems &&  <ul>
                             {item?.subItems?.map((val, id)=>{
                                return(
                                   <li key={id}>
                                    <a href={val?.url ? val?.url : null}><b><Image src={val?.src} alt="" /></b> {val?.title} <span>{val?.count}</span></a>
                                  </li>
                                )
                             })}
                         </ul>}
                        </li>
                    )
                })}
            </ul>

            <h2>Label</h2>
            <ul className={styles.menuLabel}>
                {labelList.map((item, ind)=>{
                    return(
                        <li className={`${styles.downMenu} ${!item?.subItems && styles.downMenuSty}`} key={ind}>
                            <a onClick={()=> item?.subItems ? menuHandler(ind) : null}  href={item?.url ? item?.url : null}>
                                <b style={{background: item?.color}}></b>{item?.title}
                            </a>
                        {isOpen === ind && <>
                        {item?.subItems && <ul>
                             {item?.subItems?.map((val, id)=>{
                                return(
                                    <li key={id}><a href={val?.url}><b style={{background: item?.color}}></b>{val?.title}</a></li>
                                )
                             })}
                         </ul>}
                        </> }
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

