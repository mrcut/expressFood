import { useState, useEffect } from "react";
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
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userStored = localStorage.getItem("user");
      const token = userStored ? JSON.parse(userStored).token : null;

      if (token) {
        try {
          const response = await axios.get(`http://localhost:5003/User/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        }
      } else {
        console.error("Token not found");
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((currentUser) => ({ ...currentUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userStored = localStorage.getItem("user");
    const token = userStored ? JSON.parse(userStored).token : null;

    if (!token) {
      console.error("Token not found");
      return;
    }

    try {
      await axios.put(`http://localhost:5003/UserEdit/${id}`, user, {
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
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Prénom"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputChange}
                />{" "}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Nom"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Adresse"
                  name="address"
                  value={user.address}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="role-label">Rôle</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={user.role}
                    onChange={handleInputChange}
                    label="Rôle"
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
