import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProductEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [newValues, setNewValues] = useState({
    name: "",
    image: "",
    description: "",
    type: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    // Fetching product data
    const fetchProduct = async () => {
      if (!user) {
        console.error("User not found");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5003/ProductsList/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setNewValues({
          name: response.data.name,
          type: response.data.type,
          price: response.data.price,
          image: response.data.image,
          description: response.data.description,
          quantity: response.data.quantity,
        });
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    fetchProduct();
  }, [id, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5003/ProductEdit/${id}`, newValues);
      navigate("/products");
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
        Modifier le Produit
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
                  id="name"
                  label="Nouveau Nom"
                  name="name"
                  value={newValues.name}
                  onChange={handleInputChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Nouvelle Description"
                  name="description"
                  value={newValues.description}
                  onChange={handleInputChange}
                />
                <OutlinedInput
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="price"
                  label="Nouveau Prix"
                  name="price"
                  type="number"
                  value={newValues.price}
                  onChange={handleInputChange}
                  endAdornment={
                    <InputAdornment position="end">€</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="product-type">Type de Produit</InputLabel>
                  <Select
                    label="Nouveau Type"
                    labelId="product-type"
                    id="type"
                    name="type"
                    value={newValues.type}
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
                  label="Nouvelle Image"
                  name="image"
                  value={newValues.image}
                  onChange={handleInputChange}
                  required
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

export default ProductEdit;
