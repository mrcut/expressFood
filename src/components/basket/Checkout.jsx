import { useState } from "react";
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
import { Alert } from "@mui/material";

const Checkout = () => {
  const { items: basketItems, clearBasket } = useBasket();
  const { user } = useAuth();
  const totalPrice = basketItems
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);
  const deliveryTax = totalPrice >= 19.99 ? 0 : 2.99;
  const finalTotalPrice = parseFloat(totalPrice) + deliveryTax;
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);

  const handlePlaceOrder = async () => {
    try {
      const currentDate = new Date();

      const { data: deliverers } = await axios.get(
        "http://localhost:5003/DeliverersList"
      );
      const freeDeliverers = deliverers.filter(
        (deliverer) => deliverer.status === "free"
      );

      if (freeDeliverers.length === 0) {
        setAlertVisible(true);
        return;
      } else {
        setAlertVisible(false);
      }

      const assignedDeliverer = freeDeliverers[0];
      await axios.put(
        `http://localhost:5003/DelivererEdit/${assignedDeliverer._id}`,
        {
          status: "inDelivery",
        }
      );

      const { data: order } = await axios.post(
        "http://localhost:5003/OrderAdd",
        {
          items: basketItems,
          date: currentDate,
          price: finalTotalPrice,
          delivererName: assignedDeliverer.firstname,
          email: user.email,
        }
      );

      clearBasket();

      navigate("/orders", {
        state: {
          orderId: order._id,
          deliverer: assignedDeliverer,
          estimatedDeliveryTime: 20,
          orderDate: currentDate,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  return (
    <Container style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>
      {alertVisible && (
        <Alert severity="error" style={{ marginBottom: "20px" }}>
          Aucun Livreur Disponible pour le moment.
        </Alert>
      )}
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
      >
        Passer la commande
      </Button>
    </Container>
  );
};

export default Checkout;
