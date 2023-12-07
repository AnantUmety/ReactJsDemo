import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const OTPInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']); 

  const handleChange = (event, index) => {
    const { value } = event.target;
    const newOtp = [...otp];
    
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (index < otp.length - 1 && value.length === 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          label={`Digit ${index + 1}`}
          variant="outlined"
          value={digit}
          onChange={(event) => handleChange(event, index)}
          inputProps={{
            maxLength: 1,
            inputMode: 'numeric',
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
