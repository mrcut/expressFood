import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "./UserCard";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userStored = localStorage.getItem("user");
        if (!userStored) {
          console.error("User not found in localStorage");
          return;
        }

        const { token } = JSON.parse(userStored);
        if (!token) {
          console.error("Token not found in user object from localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:5003/UsersList/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Détails de l'Utilisateur
      </Typography>
      <Grid container spacing={2}>
        <UserCard user={user} />
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => navigate("/users")}
      >
        Retour à la liste des utilisateurs
      </Button>
    </Container>
  );
};

export default UserDetail;
