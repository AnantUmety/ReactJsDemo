import { CheckboxButton, Tooltip } from "@/component/Assets/Elements";
import ButtonGlobal from "@/component/ButtonGlobal";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import { Checkbox, Grid, TextField } from "@mui/material";
import styles from "./schoolDeatil.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserAdminAction } from "@/redux/action/addUserAdminAction";
import { isValidEmail } from "@/utils/validation";

const AddAdmin = ({ orgId, adminAdded }) => {
  const formList = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email_id: "",
    is_next_sign_in: 0,
    org_id: orgId,
    is_primary: 0,
  };
  const [apiError, setApiError] = useState("");
  const { addAdmin } = useSelector((state) => {
    return {
      addAdmin: state?.organizationData?.addAdmin,
    };
  });

  useEffect(() => {
    if (addAdmin?.status == 200) {
      adminAdded();
    } else if (addAdmin?.status == 400) {
      setApiError(addAdmin?.message);
      setTimeout(() => {
        setApiError("");
      }, 3000);
    }
  }, [addAdmin]);

  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberMeTip, setRememberMeTip] = useState(false);
  const [formData, setFormData] = useState(formList);
  const [error, setError] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setError((prevError) => ({ ...prevError, [name]: undefined }));
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validation = (formData) => {
    const errors = {};
    if (!formData.first_name.trim()) {
      errors.first_name = "Full Name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last Name is required";
    }
    if (!formData.username.trim()) {
      errors.username = "User Name is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formData.email_id.trim()) {
      errors.email_id = "Email is required";
    } else if (!isValidEmail(formData.email_id)) {
      errors.email_id = "Invalid email id";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(formData);
    const noError = Object.keys(validationErrors).length === 0;
    if (noError) {
      dispatch(addUserAdminAction(formData));
    } else {
      setError(validationErrors);
    }
  };

  return (
    <div className={styles.addAdmForm}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={formData.first_name}
              onChange={handleChange}
              id="first_name"
              label="First name"
              variant="filled"
              name="first_name"
              fullWidth
              className="customeFields"
            />
            {error.first_name && <ErrorBox title={error.first_name} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.last_name}
              onChange={handleChange}
              name="last_name"
              id="last_name"
              label="Last name"
              variant="filled"
              fullWidth
              className="customeFields"
            />
            {error.last_name && <ErrorBox title={error.last_name} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.username}
              onChange={handleChange}
              name="username"
              id="username"
              label="User name"
              variant="filled"
              fullWidth
              className="customeFields"
            />
            {error.username && <ErrorBox title={error.username} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.password}
              onChange={handleChange}
              name="password"
              id="userPassword"
              label="Password"
              variant="filled"
              fullWidth
              className="customeFields"
              type="password"
            />
            {error.password && <ErrorBox title={error.password} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.email_id}
              onChange={handleChange}
              name="email_id"
              id="email_id"
              label="Email"
              variant="filled"
              fullWidth
              type="email"
              className="customeFields"
            />
            {error.email_id && <ErrorBox title={error.email_id} />}
          </Grid>
          <Grid item xs={6} className={styles.tipPosition}>
            <CheckboxButton
              className={styles.isPrimary}
              label="Primary"
              initialValue={rememberMe}
              onChange={() => {
                rememberMe
                  ? setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["is_primary"]: 0,
                    }))
                  : setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["is_primary"]: 1,
                    }));

                setRememberMe(!rememberMe);
              }}
              size="small"
            />

            {/* {rememberMe && (
              <div className={styles.toolTip}>
                <section>
                  <CheckboxButton
                    className={styles.isPrimary}
                    label="DEF 1"
                    initialValue={rememberMeTip}
                    onChange={() => setRememberMeTip(!rememberMeTip)}
                    size="small"
                  />
                </section>
              </div>
            )} */}
          </Grid>
          <Grid item xs={6} className={styles.tipPosition}>
            <CheckboxButton
              className={styles.isPrimary}
              label="Change password in next sign in"
              initialValue={formData.is_next_sign_in == 1 ? true : false}
              onChange={() => {
                formData.is_next_sign_in == 1
                  ? setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["is_next_sign_in"]: 0,
                    }))
                  : setFormData((prevFormData) => ({
                      ...prevFormData,
                      ["is_next_sign_in"]: 1,
                    }));
              }}
              size="small"
            />
          </Grid>
          <ErrorBox title={apiError} />
          <Grid item xs={12}>
            <ButtonGlobal type="submit" title="Submit" width="auto" />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddAdmin;
