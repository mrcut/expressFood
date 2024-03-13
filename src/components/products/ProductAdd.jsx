import {
  Button,
  Container,
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

const ProductAdd = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 1,
    image: "",
    description: "",
    type: "plat",
    price: "12.99",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5003/ProductAdd", newProduct);
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error.message);
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
        <Typography component="h1" variant="h5">
          Ajouter un Nouveau Produit
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            autoFocus
            label="Nom"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            autoFocus
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
          <OutlinedInput
            variant="outlined"
            margin="normal"
            fullWidth
            id="price"
            label="Prix"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="quantity"
            label="Quantité"
            name="quantity"
            type="number"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel id="product-label">Type de Produit</InputLabel>
            <Select
              labelId="product-label"
              id="type"
              name="type"
              value={newProduct.type}
              onChange={handleInputChange}
            >
              <MenuItem value="plat">Plat</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            fullWidth
            id="image"
            autoFocus
            label="Image"
            name="image"
            value={newProduct.image}
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

export default ProductAdd;
