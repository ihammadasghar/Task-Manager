import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions, STAGES } from "../../store/tasks/slice";
import { editTask } from "../../store/tasks/actions";

import { ArrowForward, ArrowBack, Edit as EditIcon } from '@mui/icons-material';
import { IconButton, Container, Modal, Card, CardContent, CardActionArea, CardActions, Typography, Button } from "@mui/material";
import CommentSection from "./CommentSection";
import EditTaskForm from "./EditTaskForm";
import { uiActions } from "../../store/ui/slice";

const style = {
    position: 'absolute',
    transform: 'translate(-50%, -20%)',
    width: { xs: "90%", md: "50%" },
    bgcolor: 'background.main',
    boxShadow: 24,
    top: '20%',
    left: '50%',
    overflow: 'auto',
    height: "90%",
    display: 'block'
};

const TaskDetailModal = () => {
    const taskId = useSelector((state) => state.tasks.detailViewTaskId);
    const task = useSelector((state) => state.tasks.allTasks.find((t) => t.id === taskId));
    const editTaskView = useSelector((state) => state.ui.editTaskView);
    const isOpen = useSelector((state) => state.tasks.detailsModal);
    const userPermission = useSelector((state) => state.auth.user.permission);
    const theme = useTheme();
    const dispatch = useDispatch();

    const { id, header, description, createdAt, stage, createdBy, taskboard_id } = task;

    const switchToEditView = () => {
        dispatch(uiActions.setState({ name: "editTaskForm", value: { header, description } }));
        dispatch(uiActions.setState({ name: "editTaskView", value: true }));
    }
    const updateStage = (updateBy) => dispatch(editTask({ id, taskboard_id, stage: (Number(stage) + updateBy) }));
    return (
        <Modal
            open={isOpen}
            onClose={() => { dispatch(taskActions.toggle("detailsModal")); dispatch(uiActions.setState({ name: "editTaskView", value: false })) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ bgcolor: "grey" }}
        >
            <Container component="main" maxWidth="sm">
                <Card sx={style}>
                    <CardContent>
                        {editTaskView ?
                            <EditTaskForm task={task} />
                            :
                            <Card
                                sx={{
                                    bgcolor: 'onBackground.box'
                                }}
                            >
                                <CardActionArea>
                                    <CardContent>
                                        <div style={{ width: "100%" }}>
                                            <Typography
                                                gutterBottom
                                                color="onBackground.main"
                                                component="div"
                                                sx={{
                                                    display: "inline-block"
                                                }}
                                            >
                                                {header}
                                            </Typography>
                                            {userPermission > 1 &&
                                                <IconButton
                                                    sx={{
                                                        p: 2,
                                                        float: "right",
                                                        display: "inline-block"
                                                    }}
                                                    aria-label="edit"
                                                    onClick={switchToEditView}
                                                >
                                                    <EditIcon
                                                        fontSize="small"
                                                        style={{
                                                            fill: theme.palette.onBackground.main,
                                                        }}
                                                    />
                                                </IconButton>
                                            }
                                        </div>
                                        <Typography
                                            variant="body2"
                                            color="onBackground.main"
                                            sx={{
                                                whiteSpace: "pre-wrap"
                                            }}
                                        >
                                            {description}
                                        </Typography>
                                        <Typography color="onBackground.dim">
                                            By {createdBy} at {createdAt}
                                        </Typography>

                                    </CardContent>

                                </CardActionArea>
                                <CardActions>

                                    {stage !== "0" &&
                                        <Button
                                            sx={{
                                                width: "100%",
                                            }}
                                            color="onBackground"
                                            onClick={() => updateStage(-1)}
                                        >
                                            <ArrowBack style={theme.styles.iconOnBackground} />
                                            {STAGES[Number(stage) - 1]}
                                        </Button>
                                    }

                                    {stage !== "3" &&
                                        <Button
                                            sx={{
                                                width: "100%",
                                            }}
                                            color="onBackground"
                                            onClick={() => updateStage(1)}
                                        >
                                            {STAGES[Number(stage) + 1]}<br />
                                            <ArrowForward style={theme.styles.iconOnBackground} />
                                        </Button>
                                    }
                                </CardActions>

                            </Card>
                        }
                        <CommentSection />
                    </CardContent>
                </Card>
            </Container>
        </Modal>
    )
}

export default TaskDetailModal;