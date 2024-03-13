import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const DelivererEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [newValues, setNewValues] = useState({
    lastname: "",
    firstname: "",
    statut: "",
    position: "",
  });

  useEffect(() => {
    const fetchDelivererDetails = async () => {
      if (!user) {
        console.error("Deliverer not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5003/Deliverer/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setNewValues({
          lastname: response.data.lastname,
          firstname: response.data.firstname,
          statut: response.data.statut,
          position: response.data.position,
        });
      } catch (error) {
        console.error("Error fetching deliverer details:", error.message);
      }
    };

    fetchDelivererDetails();
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5003/DelivererEdit/${id}`, newValues);
      navigate("/users");
    } catch (error) {
      console.error("Error updating deliverer:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Modifier le Livreur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastname"
                  label="Nom"
                  name="lastname"
                  value={newValues.lastname}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="firstname"
                  label="Prénom"
                  name="firstname"
                  required
                  value={newValues.firstname}
                  onChange={handleInputChange}
                />
                <FormControl fullWidth>
                  <InputLabel id="statut-label">Statut</InputLabel>
                  <Select
                    labelId="statut-label"
                    id="statut"
                    name="statut"
                    required
                    value={newValues.statut || ""}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="free">Libre</MenuItem>
                    <MenuItem value="inDelivery">
                      En cours de livraison
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  required
                  value={newValues.position}
                  onChange={handleInputChange}
                />
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

export default DelivererEdit;
