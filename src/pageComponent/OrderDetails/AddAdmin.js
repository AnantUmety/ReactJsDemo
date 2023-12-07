import { CheckboxButton, Tooltip } from "@/component/Assets/Elements";
import ButtonGlobal from "@/component/ButtonGlobal";
import { ErrorBox } from "@/component/MessageBox/MessageBox";
import { Checkbox, Grid, TextField } from "@mui/material";
import styles from "./orderDetail.module.scss";
import { useState } from "react";

const AddAdmin = () => {
  const formList = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
  };

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
    if (!formData.firstName.trim()) {
      errors.firstName = "Full Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.userName.trim()) {
      errors.userName = "User Name is required";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(formData);
    const noError = Object.keys(validationErrors).length === 0;
    if (noError) {
      alert();
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
              value={formData.firstName}
              onChange={handleChange}
              id="firstName"
              label="First name"
              variant="filled"
              name="firstName"
              fullWidth
              className="customeFields"
            />
            {error.firstName && <ErrorBox title={error.firstName} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.lastName}
              onChange={handleChange}
              name="lastName"
              id="lastName"
              label="Last name"
              variant="filled"
              fullWidth
              className="customeFields"
            />
            {error.lastName && <ErrorBox title={error.lastName} />}
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={formData.userName}
              onChange={handleChange}
              name="userName"
              id="userName"
              label="User name"
              variant="filled"
              fullWidth
              className="customeFields"
            />
            {error.userName && <ErrorBox title={error.userName} />}
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
              value={formData.email}
              onChange={handleChange}
              name="email"
              id="emailID"
              label="Email"
              variant="filled"
              fullWidth
              type="email"
              className="customeFields"
            />
            {error.email && <ErrorBox title={error.email} />}
          </Grid>
          <Grid item xs={6} className={styles.tipPosition}>
            <CheckboxButton
              className={styles.isPrimary}
              label="Primary"
              initialValue={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              size="small"
            />

           {rememberMe && <div className={styles.toolTip}>
            <section>
            <CheckboxButton
              className={styles.isPrimary}
              label="DEF 1"
              initialValue={rememberMeTip}
              onChange={() => setRememberMeTip(!rememberMeTip)}
              size="small"
            />
            </section>
            </div>}

          </Grid>
          <Grid item xs={12}>
            <ButtonGlobal type="submit" title="Submit" width="auto" />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddAdmin;
