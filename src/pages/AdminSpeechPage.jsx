import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const AdminSpeechPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        School Administration Speech
      </Typography>
      <Grid container spacing={3}>
        {/* Left grid item with image */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image="/path/to/speaker-image.jpg" // Replace with actual image path
              alt="Speaker Image"
            />
            <CardContent>
              <Typography variant="subtitle1" align="center">
                [Speaker Name]
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Right grid item with speech */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Sample Speech
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis, dolor nec eleifend ultricies, arcu
                lectus efficitur enim, eget lacinia libero velit id velit. Maecenas in massa nec purus ultricies feugiat.
                Pellentesque tincidunt magna sed mi maximus aliquet. Proin vitae odio ultricies, convallis odio vel, suscipit
                libero. Nullam mattis enim nec scelerisque tincidunt. Nam nec tortor magna. Vivamus nec ultricies justo. Ut
                commodo viverra elit, id consequat nulla. Morbi venenatis odio vel aliquet viverra. In ultrices efficitur
                nisi, vitae efficitur velit laoreet vel. Donec rutrum libero id nunc condimentum, ac ultricies magna
                convallis. Vivamus nec eros sed lacus blandit suscipit eget eu libero. Sed ut ligula fermentum, consectetur
                quam et, tempor est. Quisque euismod risus sit amet arcu tempus, nec mattis nunc placerat. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec id quam non dolor porttitor
                vehicula. Proin tincidunt, quam non pharetra fermentum, odio tortor placerat purus, nec fringilla ligula
                lacus id odio.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminSpeechPage;
