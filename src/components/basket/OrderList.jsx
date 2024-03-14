import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthProvider";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // Initialize with null
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.email) return;

      try {
        const response = await fetch(
          `http://localhost:5003/Order/email/${user.email}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user?.email, user?.token]);

  useEffect(() => {
    if (!selectedOrder) {
      setTimeLeft(null);
      return;
    }

    const endTime = new Date(selectedOrder.date).getTime() + 20 * 60000; // Add 20 minutes
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        setTimeLeft("Livraison estimée effectuée.");
        clearInterval(timer);
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}m ${seconds}s`);
      }
    };

    updateTimer(); // Update immediately to avoid delay
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [selectedOrder]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des Commandes
      </Typography>
      <List>
        {orders?.map((order) => (
          <Paper
            key={order._id}
            elevation={2}
            style={{ marginBottom: "10px", padding: "15px" }}
          >
            <ListItem button onClick={() => setSelectedOrder(order)}>
              <ListItemText
                primary={`Commande ID: ${order._id}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Prix Total: {order.totalprice}€{" "}
                      {/* Ensure this matches your model */}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Livreur: {order.delivererName}{" "}
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      Temps estimé avant livraison: {timeLeft}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
      {selectedOrder && (
        <>
          <Typography variant="h5" gutterBottom>
            Détails de la Commande
          </Typography>
          <Typography variant="subtitle1">
            ID de la commande: {selectedOrder._id}
          </Typography>

          {/* Additional selected order details here */}
        </>
      )}
    </Container>
  );
};

export default OrderList;
