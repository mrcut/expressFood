import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import ProductCard from "../products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
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
          setProducts(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [user]);

  const plats = products.filter((product) => product.type === "plat");
  const desserts = products.filter((product) => product.type === "dessert");

  return (
    <Container style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Listes des produits
      </Typography>
      <Grid container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
          onClick={() => navigate("/addProduct")}
        >
          Ajouter un Produit
        </Button>
      </Grid>

      <Typography variant="h3" align="center" gutterBottom>
        Tous les Plats
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {plats.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ marginTop: "2rem" }}
      >
        Tous les Desserts
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {desserts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
