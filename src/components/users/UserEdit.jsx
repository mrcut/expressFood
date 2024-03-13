import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [newValues, setNewValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userStored = localStorage.getItem("user");
    const token = userStored ? JSON.parse(userStored).token : null;

    if (token) {
      axios
        .get(`http://localhost:5003/User/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setNewValues((prevValues) => ({
            ...prevValues,
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            phone: response.data.phone || "",
            email: response.data.email || "",
            address: response.data.address || "",
            role: response.data.role || "",
          }));
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.message);
        });
    } else {
      console.error("Token not found");
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userStored = localStorage.getItem("user");
      const token = userStored ? JSON.parse(userStored).token : null;

      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.put(`http://localhost:5003/UserEdit/${id}`, newValues, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Modifier l'Utilisateur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: 1 }}
                >
                  Ancien Nom: {user.lastname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ancien Prénom: {user.firstname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ancien Téléphone: {user.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ancien Email: {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ancien Rôle: {user.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="nom"
                  label="Nouveau Nom"
                  name="nom"
                  value={newValues.nom}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="prenom"
                  label="Nouveau Prénom"
                  name="prenom"
                  value={newValues.prenom}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="tel"
                  label="Nouveau Téléphone"
                  name="tel"
                  value={newValues.tel}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Nouveau Email"
                  name="email"
                  value={newValues.email}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="role-label">Nouveau Rôle</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={newValues.role}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Enregistrer les modifications
        </Button>
      </form>
    </Container>
  );
};

export default UserEdit;
