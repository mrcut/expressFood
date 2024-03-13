import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";
import ProductCard from "../products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

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
    <Container>
      <Typography variant="h3" gutterBottom>
        Liste des produits
      </Typography>

      <Typography variant="h4" gutterBottom>
        Tous les plats
      </Typography>
      <Grid container spacing={4}>
        {plats.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: "2rem" }}>
        Tous les desserts
      </Typography>
      <Grid container spacing={4}>
        {desserts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
