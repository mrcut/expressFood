import { TextField } from "@mui/material";

export const regEXPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;

const InputPassword = ({ label, onChange, value, ...other }) => {
  const isValidPassword = regEXPassword.test(value);

  return (
    <TextField
      fullWidth
      name="password"
      label={label}
      type="password"
      value={value}
      variant="outlined"
      onChange={onChange}
      error={!isValidPassword && value !== ""}
      helperText={
        !isValidPassword && value !== ""
          ? "Mot de passe: 6 caractères min, majuscule, minuscule, numérique et caractères spéciaux"
          : ""
      }
      {...other}
    />
  );
};

export default InputPassword;
