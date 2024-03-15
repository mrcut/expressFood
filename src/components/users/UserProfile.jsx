import SendIcon from "@mui/icons-material/Send";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [newValues, setNewValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5003/User/${user._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => {
          setNewValues({
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            phone: response.data.phone || "",
            email: response.data.email || "",
            address: response.data.address || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error.message);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5003/UserEdit/${user._id}`,
        newValues,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updatedUser = { ...response.data, token: user.token };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        p: 2,
        mt: "5%",
      }}
      maxWidth="sm"
    >
      <Typography component="h1" variant="h5">
        Mes Infos
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container sx={{ pt: 5 }} spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="firstname"
              name="firstname"
              label="Prénom"
              value={newValues.firstname}
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="lastname"
              name="lastname"
              label="Nom"
              value={newValues.lastname}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={newValues.email}
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phone"
              name="phone"
              label="Téléphone"
              value={newValues.phone}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              name="address"
              label="Adresse"
              value={newValues.address}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              fullWidth
            >
              Envoyer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UserProfile;
