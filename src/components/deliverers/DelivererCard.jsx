import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const DelivererCard = ({ deliverer }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {`${deliverer.firstname} ${deliverer.lastname}`}
          </Typography>
          <Typography color="textSecondary">{`Statut: ${deliverer.statut}`}</Typography>
          <Typography color="textSecondary">{`Position: ${deliverer.position}`}</Typography>
        </CardContent>
        <CardActions>
          {["Edit", "Delete"].map((action, index) => (
            <Link
              key={index}
              to={`/${action.toLowerCase()}Deliverer/${deliverer._id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="small"
                color={action === "Delete" ? "secondary" : "primary"}
              >
                {action}
              </Button>
            </Link>
          ))}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DelivererCard;
