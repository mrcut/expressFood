import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";

const DelivererDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteDeliverer = async () => {
      try {
        await axios.delete(`http://localhost:5003/DelivererDelete/${id}`);
        console.log("Le livreur a été supprimé avec succès.");
      } catch (error) {
        console.error(
          "Erreur lors de la suppression du livreur:",
          error.message
        );
      }
    };

    deleteDeliverer();
  }, [id, navigate]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Suppression du Livreur
      </Typography>
      <Typography variant="body1">
        Le livreur a été supprimé avec succès.
      </Typography>
      <Button
        component={Link}
        to="/users"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Retour à la Liste des Livreurs
      </Button>
    </Container>
  );
};

export default DelivererDelete;
