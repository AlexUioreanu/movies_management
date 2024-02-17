import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const BorderTextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      {...props}
      InputLabelProps={{
        style: { color: "white" },
        ...props.InputLabelProps,
      }}
      InputProps={{
        style: { color: "white" },
        ...props.InputProps,
      }}
      sx={{
        "& label": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
        ...props.sx,
      }}
    />
  );
};

export default BorderTextField;
