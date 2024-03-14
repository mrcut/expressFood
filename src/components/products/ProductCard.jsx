import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useBasket } from "../contexts/BasketContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToBasket } = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToBasket = () => {
    addToBasket(product, quantity);
    setSnackbarOpen(true);
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
            </CardContent>
          </CardActionArea>

          {user && (
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
          )}
          {user && user.role === "admin" && (
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
