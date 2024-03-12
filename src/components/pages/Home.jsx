import {
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Typography,
  CardActionArea,
  Button,
  Box,
} from "@mui/material";

const Home = () => {
  const plats = [
    {
      title: "Spaghetti Bolognaise",
      description: "Fait maison par notre chef italien Luigi",
      image:
        "https://i.pinimg.com/736x/51/9f/01/519f01521b2da8384f66b605b3d9ecdb.jpg",
      price: "11.99€",
    },
    {
      title: "Plat 2",
      description: "Un burger qui ne vous laissera pas sur votre faim",
      image:
        "https://offloadmedia.feverup.com/parissecret.com/wp-content/uploads/2020/10/28044030/Copie-de-Design-sans-titre-2020-10-27T135423.121-1024x576.jpg",
      price: "13.99€",
    },
  ];

  const desserts = [
    {
      title: "Tiramisu",
      description: "Fait maison par notre chef pâtissier",
      image:
        "https://img.cuisineaz.com/660x660/2023/11/20/i196570-tiramisu-simple.jpg",
      price: "4.99€",
    },
    {
      title: "Mousse au chocolat",
      description: "Onctueuse et légère, un vrai délice !",
      image:
        "https://www.fourchettenutrition.com/wp-content/uploads/2021/06/Capture-decran-2021-07-21-a-13.48.47.png",
      price: "4.99€",
    },
  ];

  const renderCard = (item, index) => (
    <Grid item xs={12} md={6} key={index}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {item.price}
            </Typography>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"
        textAlign="center"
      >
        <Typography variant="h2" color="textPrimary" gutterBottom>
          Menu du jour
        </Typography>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/31/12/34/waiter-1015623_640.jpg"
          alt="Serveur"
          style={{ maxWidth: "30%", height: "auto" }}
        />
        <Typography variant="h4" component="h2" gutterBottom>
          Nos Plats
        </Typography>
        <Grid container spacing={4}>
          {plats.map((plat, index) => renderCard(plat, index))}
        </Grid>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Nos Desserts
        </Typography>
        <Grid container spacing={4}>
          {desserts.map((dessert, index) => renderCard(dessert, index))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
