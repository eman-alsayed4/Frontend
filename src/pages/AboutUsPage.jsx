import { Fragment } from "react";
import { Container, Typography, Paper } from '@mui/material';
import makeStyles from '@mui/material'
import React from 'react';


const AboutUsPage = () => {
  const paperStyle = {
    marginTop: '16px',
    padding: '24px',
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '32px' }}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" gutterBottom>
          About Us & What we do?
        </Typography>
        <Typography paragraph>
          Welcome to our website! We are a dedicated team of individuals passionate about coding and creating websites.
        </Typography>
        <Typography paragraph>
          Our goal is to to make a good websites. With a focus on style, we aim to achieve our goal.
        </Typography>
        <Typography paragraph>
          At Eman company, we believe in success. Our team is committed to do the pest work.
        </Typography>
        <Typography paragraph>
          In this web site we did it for schools using , That they can :.
        </Typography>
        <Typography paragraph>
          Post news (as a cards) , Post tasks for each grades , like a posts , and profile page for each students.
        </Typography>
        <Typography paragraph>
        and alsao the visitors (who not logged in) can see : the news of the school ,About the school and the speech of the school.
        </Typography>
        <Typography paragraph>
          Thank you for visiting our site. Feel free to explore and learn more about cards websites.
        </Typography>
      </Paper>
    </Container>
  );
}

export default AboutUsPage;
