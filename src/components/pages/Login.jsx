import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import InputMail, { regEXEmail } from "../forms/InputMail";

const Login = () => {
  const { setUser } = useAuth();

  const [userLog, setUserLog] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setUserLog((prevUserLog) => ({
      ...prevUserLog,
      [fieldName]: value,
    }));

    if (fieldName === "email") {
      setIsValidEmail(regEXEmail.test(value));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5003/Login",

        userLog,
        { withCredentials: true }
      );
      console.log(response.data);
      console.log(password);
      if (response.data.message === "Utilisateur connecté avec succès") {
        console.log(response.data);
        console.log(response.data.user);
        setUser({ ...response.data.user, token: response.data.token });
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Login
          </Typography>
          <form onSubmit={submit}>
            <InputMail
              label="Login"
              placeholder="Votre Login"
              onChange={(e) => handleInputChange(e, "email")}
              value={userLog.email}
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              variant="outlined"
              label="Mot de passe"
              placeholder="Votre Mot de passe"
              onChange={(e) => handleInputChange(e, "password")}
              value={userLog.password}
              sx={{ my: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValidEmail}
              sx={{ mb: 2 }}
            >
              Login
            </Button>
          </form>
          <Button color="inherit" component={Link} to="/register">
            Créer son compte
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
