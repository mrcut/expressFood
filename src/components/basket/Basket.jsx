import { Delete, RemoveShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useBasket } from "../contexts/BasketContext";

const Basket = () => {
  const { basket, removeFromBasket, clearBasket } = useBasket();

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
        Shopping Basket
      </Typography>
      {basket.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ my: 3, textAlign: "center", color: "grey" }}
        >
          Your basket is empty
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {basket.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {item.nom}
                  </Typography>
                  <Typography color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography color="textSecondary">
                    Price: ${item.price}
                  </Typography>
                  <Typography color="textSecondary">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    edge="end"
                    onClick={() => removeFromBasket(item._id)}
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={clearBasket}
        startIcon={<RemoveShoppingCart />}
        fullWidth
      >
        Clear Basket
      </Button>
    </Container>
  );
};

export default Basket;
