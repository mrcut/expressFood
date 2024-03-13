import { Button, Container, Grid, Typography, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DelivererDetail = () => {
  const { id } = useParams();
  const [deliverer, setDeliverer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDelivererDetails = async () => {
      try {
        const userStored = localStorage.getItem("user");
        const token = userStored ? JSON.parse(userStored).token : null;

        const response = await axios.get(
          `http://localhost:5003/DelivererList/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDeliverer(response.data);
      } catch (error) {
        console.error("Error fetching deliverer details:", error.message);
      }
    };
    fetchDelivererDetails();
  }, [id]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Détails du Livreur
      </Typography>
      <Grid container spacing={2} direction="column">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">nom: {deliverer.lastname}</Typography>
          <Typography variant="body1">prenom: {deliverer.firstname}</Typography>
          <Typography variant="body1">statut: {deliverer.statut}</Typography>
          {/* Add more fields as necessary */}
        </Paper>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate("/users")}
      >
        Retour à la liste des livreurs
      </Button>
    </Container>
  );
};

export default DelivererDetail;
