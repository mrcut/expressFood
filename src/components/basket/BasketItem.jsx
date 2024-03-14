import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBasket } from "../contexts/BasketContext";

const BasketItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useBasket();
  const totalPrice = (item.quantity * item.product.price).toFixed(2);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          src={item.product.image}
          alt={item.product.name}
          style={{ width: 120, height: 120, marginRight: 40 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.product.name}
        secondary={
          <>
            <Typography component="span" variant="body2">
              Quantité: {item.quantity}
            </Typography>
            <br />
            <Typography component="span" variant="body2">
              Prix: {totalPrice} €
            </Typography>
          </>
        }
      />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={() => increaseQuantity(item.product._id)}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={() => decreaseQuantity(item.product._id)}
        >
          <RemoveCircleIcon />
        </IconButton>
        <IconButton edge="end" onClick={() => removeItem(item.product._id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default BasketItem;
