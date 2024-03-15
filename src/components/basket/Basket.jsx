/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useBasket } from "../contexts/BasketContext";
import BasketItem from "./BasketItem";

const Basket = ({ open, handleClose }) => {
  const { items: basketItems } = useBasket();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
      <DialogTitle>Panier</DialogTitle>
      <DialogContent>
        <List>
          {basketItems.length > 0 ? (
            basketItems.map((item) => (
              <BasketItem key={item.product._id} item={item} />
            ))
          ) : (
            <p>Votre panier est vide.</p>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ fontWeight: "bold" }}
          onClick={handleClose}
          to="/checkout"
          component={Link}
        >
          Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Basket;
