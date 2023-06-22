import { List, ListItem, ListItemText, ListItemIcon, Divider, Card, CardContent, Typography } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const theme = useTheme();
    const alert = useSelector((state) => state.alerts.alert);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const displayManagementAlert = ("management_title" in alert && isLoggedIn);
    const displayPublicAlert = "public_title" in alert;
    if (!displayManagementAlert && !displayPublicAlert) {
        return null;
    }

    return (
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
                    Alerts
                </Typography>
                <List sx={{ width: '100%' }}>
                    {displayManagementAlert &&
                        <ListItem key="alert" alignItems="flex-start" sx={{ bgcolor: 'onBackground.box', mb: 2 }}>
                            <ListItemIcon>
                                <NotificationsActiveIcon style={theme.styles.iconSecondary} fontSize="large" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{ whiteSpace: "pre-wrap" }}
                                        component="h6"
                                        variant="h6"
                                        color="onBackground.main"
                                    >
                                        {alert.management_title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline', whiteSpace: "pre-wrap" }}
                                        component="span"
                                        variant="body2"
                                        color="onBackground.main"
                                    >
                                        {alert.management_text}
                                    </Typography>
                                }
                            />
                            <Divider />
                        </ListItem>
                    }

                    {displayPublicAlert &&
                        <ListItem key="publicAlert" alignItems="flex-start" sx={{ bgcolor: 'onBackground.box', mb: 2 }}>
                            <ListItemIcon>
                                <NotificationsActiveIcon style={theme.styles.iconSecondary} fontSize="large" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{ whiteSpace: "pre-wrap" }}
                                        component="h6"
                                        variant="h6"
                                        color="onBackground.main"
                                    >
                                        {alert.public_title}
                                    </Typography>
                                }
                                secondary={
                                    <Typography
                                        sx={{ display: 'inline', whiteSpace: "pre-wrap" }}
                                        component="span"
                                        variant="body2"
                                        color="onBackground.main"
                                    >
                                        {alert.public_text}
                                    </Typography>
                                }
                            />
                            <Divider />
                        </ListItem>
                    }

                </List>
            </CardContent>
        </Card>
    )
}

export default Alert;