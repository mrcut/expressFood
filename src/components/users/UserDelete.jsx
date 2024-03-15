/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";

const UserDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const userStored = localStorage.getItem("user");
        const token = userStored ? JSON.parse(userStored).token : null;

        if (token) {
          await axios.delete(`http://localhost:5003/UserDelete/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("User deleted successfully.");
        } else {
          console.error("Token not found");
        }
      } catch (error) {
        console.error("Error deleting user:", error.message);
      }
    };

    deleteUser();
  }, [id, navigate]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Suppression de l'Utilisateur
      </Typography>
      <Typography variant="body1">
        L'utilisateur a été supprimé avec succès.
      </Typography>
      <Button
        component={Link}
        to="/users"
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Retour à la Liste des Utilisateurs
      </Button>
    </Container>
  );
};

export default UserDelete;
