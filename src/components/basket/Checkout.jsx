import React from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import BasketItem from "./BasketItem";
import { useBasket } from "../contexts/BasketContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const Checkout = () => {
  const { items: basketItems, clearBasket } = useBasket();
  const { user } = useAuth();
  const totalPrice = basketItems
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);
  const deliveryTax = totalPrice >= 19.99 ? 0 : 2.99;
  const finalTotalPrice = parseFloat(totalPrice) + deliveryTax;
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      // Get the current date and time
      const currentDate = new Date();

      // Retrieve the list of free deliverers
      const { data: deliverers } = await axios.get(
        "http://localhost:5003/DeliverersList"
      );
      const freeDeliverers = deliverers.filter(
        (deliverer) => deliverer.status === "free"
      );

      if (freeDeliverers.length === 0) {
        throw new Error("Aucun Livreur Disponible pour le moment.");
      }

      // Assign a deliverer and update status to 'OnCourse'
      const assignedDeliverer = freeDeliverers[0];
      await axios.put(
        `http://localhost:5003/DelivererEdit/${assignedDeliverer._id}`,
        {
          status: "inDelivery",
        }
      );

      // Create a new order with deliverer information
      const { data: order } = await axios.post(
        "http://localhost:5003/OrderAdd",
        {
          items: basketItems,
          totalPrice: finalTotalPrice,
          date: currentDate,
          deliverer: {
            _id: assignedDeliverer._id,
            name: `${assignedDeliverer.firstname} ${assignedDeliverer.lastname}`,
            position: assignedDeliverer.position,
          },
          email: user.email, // Replace with actual customer email
        }
      );

      clearBasket(); // Clear the basket after successful order placement

      // Redirect to the tracking page with the order and deliverer information
      navigate("/orders", {
        state: {
          orderId: order._id,
          deliverer: assignedDeliverer,
          estimatedDeliveryTime: 20, // minutes
          orderDate: currentDate,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      // Handle the error (show an error message to the user)
    }
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      <List>
        {basketItems.map((item) => (
          <BasketItem key={item.product._id} item={item} />
        ))}
      </List>
      <Divider />
      <ListItem>
        <ListItemText primary="Sous-Total" />
        <Typography variant="subtitle1">{totalPrice} €</Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Frais de livraison" />
        <Typography variant="subtitle1">{deliveryTax} €</Typography>
      </ListItem>
      <ListItem>
        <ListItemText primary="Total" />
        <Typography variant="h6">{finalTotalPrice} €</Typography>
      </ListItem>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        style={{ marginTop: "20px" }}
        onClick={handlePlaceOrder}
        // Implement onClick to handle actual checkout process
      >
        Passer la commande
      </Button>
    </Container>
  );
};

export default Checkout;
