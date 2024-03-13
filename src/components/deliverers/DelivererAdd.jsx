import {
  Avatar,
  Button,
  Container,
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const DelivererAdd = () => {
  const [newDeliverer, setNewDeliverer] = useState({
    lastname: "",
    firstname: "",
    statut: "",
    position: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeliverer((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/DelivererAdd", newDeliverer);
      navigate("/users");
    } catch (error) {
      console.error("Error adding deliverer:", error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Ajouter un Nouveau Livreur
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="lastname"
            autoFocus
            label="Nom"
            name="lastname"
            required
            value={newDeliverer.lastname}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstname"
            label="Prénom"
            name="firstname"
            value={newDeliverer.firstname}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel id="statut-label">Statut</InputLabel>
            <Select
              labelId="statut-label"
              label="Statut"
              id="statut"
              name="statut"
              value={newDeliverer.statut}
              onChange={handleInputChange}
            >
              <MenuItem value="free">Libre</MenuItem>
              <MenuItem value="inDelivery">En cours de livraison</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="position"
            label="Position"
            name="position"
            value={newDeliverer.position}
            onChange={handleInputChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ajouter
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DelivererAdd;
