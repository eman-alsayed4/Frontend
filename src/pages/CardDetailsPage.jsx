import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const CardDetailsPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    axios.get(("/cards/" + id))
      .then(({ data }) => {
        setCard(data);
      })
      .catch((err) => {
        console.error("Error fetching card data:", err);
      });
  }, [id]);

  if (!card) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {card.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {card.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <div>By :</div> {card.userName}
          </Typography>
        </CardContent>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {card.images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardMedia
                component="img"
                height="200"
                image={image.url}
                alt={`Image ${index + 1}`}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
};

export default CardDetailsPage;
