import { Button, Box, Container, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import Alert from './alerts/Alert';
import Signature from './attendance/Signature';

const Dashboard = () => {
    const alert = Alert();
    const alertState = useSelector((state) => state.alerts.alert);
    const username = useSelector((state) => state.auth.user.name);

    return (
        <Container component="main" maxWidth="md">
            <Grid container columnSpacing={4}>
                <Grid item xs={12} md={6}>
                    <Signature />
                </Grid>
                {"top_performances" in alertState &&
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                mb: 6,
                                bgcolor: "background.main"
                            }}
                        >
                            <CardContent>
                                <Typography
                                    color="onBackground.main"
                                    variant="h5"
                                    component="div"
                                    sx={{ my: 1 }}
                                    align="center"
                                >
                                    Top Performances
                                </Typography>
                                <Box
                                    sx={{
                                        my: 2,
                                        bgcolor: 'onBackground.box',
                                        p: 1
                                    }}
                                    align="center"
                                >

                                    <Typography
                                        gutterBottom
                                        color="onBackground.main"
                                        variant="p"
                                        component="p"
                                        align="center"
                                    >
                                        {alertState.top_performances}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {"birthdays" in alertState &&
                    <Grid item xs={12}>
                        <Card
                            sx={{
                                mb: 6,
                                bgcolor: "background.main"
                            }}
                        >
                            <CardContent>
                                <Typography
                                    color="onBackground.main"
                                    variant="h5"
                                    component="div"
                                    sx={{ my: 1 }}
                                    align="center"
                                >
                                    Happy Birthday!
                                </Typography>
                                <Box
                                    sx={{
                                        my: 2,
                                        bgcolor: 'onBackground.box',
                                        p: 1
                                    }}
                                    align="center"
                                >

                                    <Typography
                                        gutterBottom
                                        color="onBackground.main"
                                        variant="p"
                                        component="p"
                                        align="center"
                                    >
                                        {alertState.birthdays}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                }
                {alert !== null &&
                    <Grid item xs={12}>
                        {alert}
                    </Grid>
                }
                <Grid item xs={12}>
                    <Box sx={{ mb: 4 }} align="center">
                        <Button
                            variant="contained"
                            sx={{ mb: 2 }}
                            color="primary"
                            onClick={() => window.open(`/login/teachers/${username}`, "_blank")}
                        >
                            Teachers' Portal
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ mb: 4, bgcolor: "primary" }} align="center">
                        <img
                            src="./images/logo.jpg"
                            style={{ width: "100%", maxWidth: "25rem" }}
                            title="Al-Ibad School Rawalpindi, Pakistan"
                            alt="Al-Ibad School Rawalpindi, Pakistan"
                        />
                    </Box>
                </Grid>
            </Grid >
        </Container >
    )
}

export default Dashboard;
