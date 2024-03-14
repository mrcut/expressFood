import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../contexts/AuthProvider";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const { user, token } = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.email) return; // Ensure user and user.email are present

      try {
        const response = await fetch(
          `http://localhost:5003/Order/${user.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Use token directly if it's separate from the user object
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json(); // Extract JSON from the response
        setOrders(data); // Assuming setOrders is your state setter function
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
    // Adjust the dependency to match the actual variable used. If `user.email` changes, re-fetch orders.
  }, [user?.email, token]);

  useEffect(() => {
    if (selectedOrder && selectedOrder.orderDate) {
      const orderTime = new Date(selectedOrder.orderDate).getTime();
      const updateTimeLeft = () => {
        const currentTime = new Date().getTime();
        const diff = Math.max(
          0,
          orderTime + selectedOrder.estimatedDeliveryTime * 60000 - currentTime
        );
        setTimeLeft(Math.floor(diff / 1000));
      };

      updateTimeLeft();
      const intervalId = setInterval(updateTimeLeft, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedOrder]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des Commandes
      </Typography>
      <List>
        {orders?.map((order) => (
          <Paper
            key={order.id}
            elevation={2}
            style={{ marginBottom: "10px", padding: "15px" }}
          >
            <ListItem button onClick={() => setSelectedOrder(order)}>
              <ListItemText
                primary={`Commande ID: ${order.id}`}
                secondary={`Date: ${new Date(
                  order.date
                ).toLocaleString()}, Total: ${order.price}€`}
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
            ID de la commande: {selectedOrder.id}
          </Typography>
          <Typography variant="subtitle1">
            Livreur: {selectedOrder.deliverer.firstname}{" "}
            {selectedOrder.deliverer.lastname}
          </Typography>
          <Typography variant="subtitle1">
            Temps estimé avant livraison: {formatTime()}
          </Typography>
          {/* Add any other information and controls related to the selected order */}
        </>
      )}
    </Container>
  );
};

export default OrderList;
