import { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const Register = () => {
  const [userRegister, setUserRegister] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!validator.isEmail(userRegister.email)) {
      tempErrors.email = "Email invalide";
    }
    if (userRegister.nom === "") {
      tempErrors.nom = "Nom est requis";
    }
    if (userRegister.prenom === "") {
      tempErrors.prenom = "Prénom est requis";
    }
    if (userRegister.mdp === "") {
      tempErrors.mdp = "Mot de passe est requis";
    }
    if (userRegister.address === "") {
      tempErrors.address = "Adresse est requise";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5003/Register",
          userRegister,
          { withCredentials: true }
        );
        if (response.data.message === "Utilisateur enregistré avec succès") {
          navigate("/");
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error.message);
      }
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
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Inscription
          </Typography>
          <form onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="prenom"
              label="Prénom"
              id="prenom"
              value={userRegister.prenom}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  prenom: e.target.value,
                }))
              }
              required
              error={Boolean(errors.prenom)}
              helperText={errors.prenom}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="nom"
              label="Nom"
              id="nom"
              value={userRegister.nom}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  nom: e.target.value,
                }))
              }
              required
              error={Boolean(errors.nom)}
              helperText={errors.nom}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="phone"
              label="Téléphone"
              id="phone"
              value={userRegister.phone}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  phone: e.target.value,
                }))
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  email: e.target.value,
                }))
              }
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="address"
              label="Addresse"
              id="address"
              value={userRegister.address}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  address: e.target.value,
                }))
              }
              required
              error={Boolean(errors.address)}
              helperText={errors.address}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="mdp"
              label="Mot de passe"
              type="password"
              id="mdp"
              value={userRegister.mdp}
              onChange={(e) =>
                setUserRegister((prevUserRegister) => ({
                  ...prevUserRegister,
                  mdp: e.target.value,
                }))
              }
              required
              error={Boolean(errors.mdp)}
              helperText={errors.mdp}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
            >
              S&apos;inscrire
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
