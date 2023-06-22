import { useDispatch, useSelector } from "react-redux";
import { useDrop } from 'react-dnd';
import { dragItemTypes } from "../../utils/constants";
import { editTask } from "../../store/tasks/actions";

import { Typography, Card, CardContent, List, ListItem, } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import NewTaskField from "./NewTaskField";
import Task from "./Task";

const TaskStage = ({ name, stageNumber }) => {
    const dispatch = useDispatch();
    const choosenTaskboardId = useSelector((state) => state.tasks.choosenTaskboardId);
    const updateStage = (id) => dispatch(editTask({ id, taskboard_id: choosenTaskboardId, stage: stageNumber }));

    const [{ isOver }, drop] = useDrop(() => ({
        accept: dragItemTypes.TASK,
        drop: monitor => updateStage(monitor.itemId),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    }), [])

    const tasks = useSelector((state) => state.tasks.allTasks.filter((task) => task.stage === stageNumber));
    const userPermission = useSelector((state) => state.auth.user.permission);
    const canAddTask = Number(userPermission) > 1;

    return (
        <Card
            ref={drop}
            key={`taskStage${stageNumber}`}
            sx={{
                bgcolor: "background.main",
                borderRadius: "3px",
                mr: 2,
                height: "auto",
                minWidth: { xs: "80%", md: "23%" }
            }}
        >
            <CardContent sx={{ px: 1 }}>
                <Typography
                    variant="h6"
                    color="onBackground.main"
                    component="div"
                    sx={{ mx: 4 }}
                >
                    {name}
                </Typography>

                <List
                    sx={{
                        height: "70vh",
                        overflowY: "auto",
                    }}
                >
                    <ListItem key={`addtask${stageNumber}`}>
                        {canAddTask && <NewTaskField stageNumber={stageNumber} />}
                    </ListItem>

                    {tasks.length !== 0 ?
                        (tasks.map((task) => (
                            <ListItem key={`task${task.id}`}>
                                <Task task={task} />
                            </ListItem>

                        ))) :
                        (
                            <Grid xs={12}>
                                <Typography gutterBottom variant="h6" color="onBackground.main" component="div" sx={{ my: 5 }} align="center">No tasks</Typography>
                            </Grid>
                        )
                    }

                    {isOver &&
                        <ListItem
                            key={`taskMoveEmptySlot`}
                        >
                            <Card
                                sx={{
                                    bgcolor: "onBackground.box",
                                    width: 100 + "%",
                                }}
                            >
                                <CardContent sx={{ height: "100px" }}>

                                </CardContent>
                            </Card>
                        </ListItem>
                    }
                </List>
            </CardContent>
        </Card>
    )
}

export default TaskStage;