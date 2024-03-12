import { Button } from "@mui/material";
import { useBasket } from "../contexts/BasketContext";

const BasketQuantity = ({ product }) => {
  const { addToBasket, removeFromBasket } = useBasket();

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(product._id);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button onClick={handleRemoveFromBasket}>-</Button>
      <span>{product.quantity}</span>
      <Button onClick={handleAddToBasket}>+</Button>
    </div>
  );
};

export default BasketQuantity;
