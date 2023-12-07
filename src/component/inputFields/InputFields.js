import styles from "./inputFields.module.scss";
import classNames from "classnames";
// import ErrorBox from '../MessageBox/ErrorBox';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useState } from "react";

const InputFields = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);

  const changeEye = () => {
    setIsOpen(!isOpen);
  };

  const handleInputFocus = () => {
    setFocused(true);
  };

  const handleInputBlur = () => {
    if (props?.value?.length > 0) {
      return setFocused(true);
    }
    // if (props?.value?.length > 0) {
    //   return;
    // }
    setFocused(false);
  };


  return (
    <>
      <div
        className={classNames({
          [styles.inputFieldsFull]: true,
          [styles["inputFields" + props?.width]]: props?.width,
          [props?.className]: props?.className,
          [styles.erroeBoxTrue]: props?.error,
          [styles.focusList]: props?.focus,
          [styles.borderDv]: props?.border
        })}
      >
        <div
        data-attr="labelGroup"
          className={classNames({
            [styles.labelGroup]: true,
            [styles.focused]: focused,
            [styles.valueLabel]: props?.value?.length > 0,
            [styles.emailValue]: props?.emailWithNumber && props?.value?.length > 0,
          })}
        >
          {props?.label && (
            <label>{props?.label === "blank" ? <b></b> : props?.label}</label>
          )}
          <main>
            {props?.fieldname ? (
              <textarea {...props}></textarea>
            ) : (
              <>
                {props.eye ? (
                  <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                    type={isOpen ? "text" : "password"}
                    onChange={(event) => props?.handleChange(event)}
                    {...props}
                  />
                ) : (
                  <>
                    {!props?.emailWithNumber ? (
                      <input
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        autoComplete="off"
                        type={!props?.type ? "text" : props.type}
                        onChange={(event) => props?.handleChange(event)}
                        {...props}
                      />
                    ) : (
                      <>
                        <input
                          className={props?.value?.length > 0 && styles.valLeng}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          autoComplete="off"
                          maxLength={/^\d+$/.test(props?.value) && 10}
                          type={!props?.type ? "text" : props.type}
                          onChange={(event) => props?.handleChange(event)}
                          {...props}
                        />
                        <em>
                          {props?.value?.length > 0 && (
                            <>
                              {/^\d+$/.test(props?.value) ? (
                                <i>+91</i>
                              ) : (
                                <MdOutlineAlternateEmail />
                              )}
                            </>
                          )}
                        </em>
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {props.eye && (
              <em onClick={changeEye}>
                {" "}
                {isOpen ? <AiFillEye /> : <AiFillEyeInvisible />}
              </em>
            )}
          </main>
        </div>

        {props?.maxLength && props?.showMaxLength && (
          <strong>
            {props?.value?.length ? props?.value?.length : 0}/{props?.maxLength}
          </strong>
        )}
        {props.children}
        {/* {props?.errorMsg ? <ErrorBox title={props?.errorMsg} success={props?.success} icon={props?.icon} /> : null} */}
      </div>
    </>
  );
};

export default InputFields;

// type = different types for the HTML <input> element like text, number, email etc... ,
// label = define for input name
// className = If you modify button different style to use this property className={styles.abc}

export const InputFieldsEmailWith = () => {
  return <input />;
};
