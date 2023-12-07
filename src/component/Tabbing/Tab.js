
import styles from "./tab.module.scss";
import classnames from 'classnames';
export const TabHeader = ({data, className, setIsOpen, isOpen, black})=>{

    return(
        <div 
        className={classnames({
            [styles.tabList]: true,
            [className]: className,
            [styles.blackList]: black,
          })}
        >
           {data && 
            <ul>
            {data.map((item, ind) => {
              return (
                <li key={ind}>
                  <button onClick={() => setIsOpen(ind)} className={isOpen === ind && styles.active}>
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
          }
        </div>
    )
}




  
export const TabContainer = ({children, className, isOpen, value})=>{
    return(
        <div 
        className={classnames({
            [styles.tabContainers]: true,
            [className]: className
          })} 
        >
           {value === isOpen && children}
        </div>
    )
}

// value pass tab number
// isOpen pass state value