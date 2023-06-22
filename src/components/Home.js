import { useSelector, useDispatch } from 'react-redux';
import { React, useEffect } from 'react';
import getAlerts from '../store/alerts/actions';
import { Box, Container, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Alert from './alerts/Alert';

const Home = () => {
    const dispatch = useDispatch();
    const lastAlertFetchDt = useSelector((state) => state.alerts.lastAlertFetchDt);
  
    useEffect(() => {
      dispatch(getAlerts(lastAlertFetchDt));
    }, [dispatch, lastAlertFetchDt]);
    
    return (
        <Container component="main" maxWidth="md">
            <Grid container>
                <Grid item xs={12}>
                    <Card
                        sx={{
                            mb: 8,
                            bgcolor: "background.main"
                        }}
                        align="center"
                    >
                        <CardContent>
                            <Typography
                                gutterBottom
                                color="onBackground.main"
                                variant="h5"
                                component="div"
                                sx={{ my: 2 }}
                                align="center"
                            >
                                Welcome to Task Manager!
                            </Typography>
                            <Box
                                sx={{
                                    my: 2,
                                    bgcolor: 'onBackground.box',
                                    p: 3
                                }}
                                align="center"
                            >

                                <Typography
                                    gutterBottom
                                    color="onBackground.main"
                                    variant="h6"
                                    component="div"
                                    align="center"
                                >
                                    You need to sign in first
                                    </Typography>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid >
            </Grid >
        </Container >
    )
}

export default Home;
