import React from 'react';
import { Paper, Typography, List, ListItem } from '@mui/material';

const ClassesSectionComponent = () => {
    const classes = [1, 2, 3, 4, 5, 6];

    return (
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: 'white' }}>
            <Typography variant="h5" gutterBottom>
                Classes
            </Typography>
            <List>
                {classes.map((cls) => (
                    <ListItem key={cls} sx={{ padding: 1 }}>
                        <Typography variant="body1">
                            Class {cls}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ClassesSectionComponent;
