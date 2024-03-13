import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const ProductCard = ({ product, onAddToCart }) => (
  <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: "flex" }}>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.primary">
            {product.price} €
          </Typography>
          {onAddToCart && (
            <Button
              size="small"
              color="primary"
              onClick={() => onAddToCart(product)}
            >
              Add To Cart
            </Button>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func,
};

export default ProductCard;
