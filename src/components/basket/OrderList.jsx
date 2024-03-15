import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.email) return;

      try {
        const response = await fetch(`http://localhost:5003/OrdersList`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(
          data.map((order) => ({
            ...order,
            endTime: new Date(order.date).getTime() + 20 * 60000,
            timerDisplay: "",
          }))
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOrders((currentOrders) =>
        currentOrders.map((order) => {
          const timeLeft = order.endTime - new Date().getTime();
          if (timeLeft < 0) {
            return { ...order, timerDisplay: "Livraison effectuée." };
          }
          const minutes = Math.floor(
            (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          return {
            ...order,
            timerDisplay: `Temps estimé avant livraison: ${minutes}m ${seconds}s`,
          };
        })
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [orders]);

  return (
    <Container style={{ paddingTop: "5rem", paddingBottom: "4rem" }}>
      <Typography variant="h4" gutterBottom>
        Liste des Commandes
      </Typography>
      <List>
        {orders.map((order) => (
          <Paper
            key={order._id}
            elevation={2}
            style={{ marginBottom: "10px", padding: "15px" }}
          >
            <ListItem>
              <ListItemText
                primary={`Commande n°${order._id}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Mail de la commande: {order.email}
                    </Typography>
                    <Typography component="span" variant="body2">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Prix Total: {order.price}€
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Livreur: {order.delivererName}
                    </Typography>
                    <br />
                    <Typography component="div" variant="subtitle1">
                      {order.timerDisplay}
                    </Typography>
                    {order.timerDisplay !== "Livraison effectuée." && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => markAsDelivered(order._id)}
                      >
                        Livré
                      </Button>
                    )}
                  </>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default OrderList;
