import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const user = useAuth;

const ProductCard = ({ product }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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
      {user && user.role === "admin" && (
        <CardActions>
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
        </CardActions>
      )}
    </Card>
  </Grid>
);

export default ProductCard;
