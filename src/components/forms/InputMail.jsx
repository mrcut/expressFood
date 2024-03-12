import { TextField } from "@mui/material";

export const regEXEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const InputMail = ({ label, onChange, value, ...other }) => {
  const isValidEmail = regEXEmail.test(value);

  return (
    <TextField
      fullWidth
      name="email"
      label={label}
      type="text"
      variant="outlined"
      onChange={onChange}
      value={value}
      error={!isValidEmail && value !== ""}
      helperText={!isValidEmail && value !== "" ? "Email invalide" : ""}
      {...other}
    />
  );
};

export default InputMail;
