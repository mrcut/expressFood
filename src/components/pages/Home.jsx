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
          const response = await fetch("http://localhost:5003/randomProducts", {
            //changer avec randomProduct si utilisation de cron
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

          const availableProducts = data.filter(
            (product) => product.available === true
          );

          setProducts(availableProducts); //mettre data a la place
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
    <Container style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Menu du jour
      </Typography>

      <Typography variant="h3" align="center" gutterBottom>
        Nos Plats
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
        Nos Desserts
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
