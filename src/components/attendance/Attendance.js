import { useDispatch, useSelector } from "react-redux";
import { getStaffList } from "../../store/attendance/actions";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { uiActions } from "../../store/ui/slice";

import { Container, Card, CardContent, Typography, List, ListItem, IconButton, Paper, InputBase, Divider, Box } from "@mui/material";
import { CheckCircleOutline } from '@mui/icons-material';

const Attendance = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStaffList());
    }, [dispatch]);
    const staffList = useSelector((state) => state.attendance.staffList);
    const attendanceSignsForm = useSelector((state) => state.ui.attendanceSignsForm);

    const handleChange = (event, memberName) => {
        dispatch(uiActions.setFormValue({ form: "attendanceSignsForm", field: memberName, value: event.target.value }));
    }
    const markAttendance = (event, memberName) => {
        event.preventDefault();
        // NOTE: 
        // handle submit here
        // use attendanceSignsForm[memberName] to get input sign of the member
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ my: 4, }}>
            <Card
                sx={{
                    bgcolor: "background.main",
                    minHeight: "75vh"
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
                        Attendance
                    </Typography>
                    {staffList.length !== 0 ?
                        <List
                            sx={{
                                bgcolor: 'onBackground.box',
                                borderRadius: '3px'
                            }}
                        >
                            {staffList.map((member) => (
                                <ListItem
                                    key={`${member.name}-sign`}
                                    alignItems="flex-start"
                                >
                                    <Paper
                                        component="form"
                                        sx={{
                                            p: '2px 4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: "100%",
                                            bgcolor: "onBackground.textField",
                                        }}
                                        onSubmit={(e) => markAttendance(e, member.name)}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1, color: "onBackground.main" }}
                                            placeholder={`${member.fullName} signs`}
                                            inputProps={{ 'aria-label': `${member.fullName} signs` }}
                                            value={member.name in attendanceSignsForm ? attendanceSignsForm[member.name] : ""}
                                            onChange={(e) => handleChange(e, member.name)}
                                        />
                                        <IconButton
                                            type="submit"
                                            sx={{ p: 2 }}
                                            aria-label="sign"
                                        >
                                            <CheckCircleOutline
                                                style={{ fill: theme.palette.onBackground.main }}
                                            />
                                        </IconButton>
                                    </Paper>
                                    <Divider />
                                </ListItem>
                            ))
                            }

                        </List>
                        :
                        <Box
                            sx={{
                                bgcolor: "onBackground.box",
                                borderRadius: "3px"
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="onBackground.main"
                                component="div"
                                sx={{ my: 1, p: 5 }}
                                align="center"
                            >
                                No members
                            </Typography>
                        </Box>
                    }
                </CardContent>
            </Card>
        </Container>
    )
}

export default Attendance;