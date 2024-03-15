import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthProvider";
import UserCard from "./UserCard";
import DelivererCard from "../deliverers/DelivererCard";

const UsersList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userList, setUserList] = useState([]);
  const [delivererList, setdelivererList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5003/UsersList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();
        setUserList(data);
        console.log(setUserList);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [user, navigate, setUserList]);

  useEffect(() => {
    const fetchDeliverers = async () => {
      try {
        const response = await fetch("http://localhost:5003/DeliverersList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        const data = await response.json();
        setdelivererList(data);
        console.log(setdelivererList);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (user) {
      fetchDeliverers();
    } else {
      navigate("/login");
    }
  }, [user, navigate, setdelivererList]);

  return (
    <Container style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Utilisateurs
      </Typography>
      <Grid container spacing={2}>
        {userList.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        style={{ marginTop: "1rem"}}

        onClick={() => navigate("/register")}
      >
        Ajouter un Utilisateur
      </Button>

      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des livreurs
      </Typography>
      <Grid container spacing={2}>
        {delivererList.map((deliverer) => (
          <DelivererCard key={deliverer._id} deliverer={deliverer} />
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        style={{ marginTop: "1rem"}}

        onClick={() => navigate("/addDeliverer")}
      >
        Ajouter un Livreur
      </Button>
    </Container>
  );
};
export default UsersList;
