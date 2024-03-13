import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const ProductList = ({ type }) => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { basket, addToBasket, removeFromBasket } = useBasket();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          const storedBasket = localStorage.getItem("basket");
          const basket = storedBasket ? JSON.parse(storedBasket) : [];

          const response = await fetch("http://localhost:5003/ProductsList", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          const data = await response.json();

          let filteredProducts = data.filter(
            (product) => !basket.includes(product._id)
          );

          if (type) {
            filteredProducts = filteredProducts.filter(
              (product) => product.type === type
            );
          }

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchProducts();
  }, [user, type]);

  const getQuantity = (productId) => {
    const product = basket.find((p) => p._id === productId);
    return product ? product.quantity : 0;
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ my: 3 }}>
        Liste des Produits
      </Typography>

      {user?.role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => navigate("/addProduct")}
        >
          Ajouter un Produit
        </Button>
      )}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={({ mb: 1 }, { textAlign: "center" })}
                >
                  {product.name}
                </Typography>

                <Typography
                  color="textSecondary"
                  sx={({ mb: 1 }, { textAlign: "center" })}
                >
                  {product.price} €
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => addToBasket(product)}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{ mx: 1 }}
                />
                <Typography>{getQuantity(product._id)}</Typography>
                <Button
                  onClick={() => removeFromBasket(product._id)}
                  startIcon={<RemoveCircleOutlineIcon />}
                  sx={{ mx: 1 }}
                />

                {user?.role === "admin" && (
                  <>
                    <Link
                      to={`/editProduct/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="primary" aria-label="edit product">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Link
                      to={`/deleteProduct/${product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton color="secondary" aria-label="delete product">
                        <DeleteIcon />
                      </IconButton>
                    </Link>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
