/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";

const ProductCard = ({ product }) => {
  const location = useLocation();

  const { user } = useAuth();
  const { addToBasket } = useBasket();
  const [quantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(product.available);

  const handleAddToBasket = () => {
    addToBasket(product, quantity);
    setSnackbarOpen(true);
  };

  const toggleAvailability = async () => {
    const updatedAvailability = !isAvailable;
    setIsAvailable(updatedAvailability);

    try {
      const response = await axios.put(
        `http://localhost:5003/ProductEdit/${product._id}`,
        {
          available: updatedAvailability,
        }
      );

      console.log("Product updated successfully:", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={`${product.name} ajouté au panier`}
      />

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body1" color="text.primary">
                {product.price} €
              </Typography>
              {location.pathname !== "/" && (
                <>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    component="div"
                  >
                    Disponible:
                  </Typography>
                  <Switch
                    checked={isAvailable}
                    onChange={toggleAvailability}
                    color="primary"
                  />
                </>
              )}
            </CardContent>
          </CardActionArea>
          {user && location.pathname !== "/products" && (
            <CardActions>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton
                  onClick={handleAddToBasket}
                  aria-label="add to cart"
                >
                  <ShoppingCartIcon />
                </IconButton>
              </div>
            </CardActions>
          )}{" "}
          {user && user.role === "admin" && location.pathname !== "/" && (
            <CardActions>
              <Link
                to={`/editProduct/${product._id}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton color="primary" aria-label="edit product">
                  <EditIcon />
                </IconButton>
              </Link>
              <Link
                to={`/deleteProduct/${product._id}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <IconButton color="secondary" aria-label="delete product">
                  <DeleteIcon />
                </IconButton>
              </Link>
            </CardActions>
          )}
        </Card>
      </Grid>
    </>
  );
};

export default ProductCard;
