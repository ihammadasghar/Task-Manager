import { React, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { STAGES } from '../../store/tasks/slice';
import { getTaskList } from '../../store/tasks/actions'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Typography, Container, Box } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

import TaskDetailModal from "./TaskDetailModal";
import TaskStage from './TaskStage';

const Taskboard = () => {
    const dispatch = useDispatch();
    const lastTaskFetchDt = useSelector((state) => state.tasks.lastTaskFetchDt);
    const loadedTaskboardId = useSelector((state) => state.tasks.loadedTaskboardId);
    const taskboardId = useSelector((state) => state.tasks.choosenTaskboardId);
    const taskboard = useSelector((state) => state.auth.user.taskboards.find((t) => t.id === taskboardId));
    useEffect(() => {
        dispatch(getTaskList(lastTaskFetchDt, loadedTaskboardId !== taskboardId));
    }, [loadedTaskboardId, taskboardId, dispatch, lastTaskFetchDt]);

    const theme = useTheme();
    const detailsModalToggle = useSelector((state) => state.tasks.detailsModal);

    const taskStages = [];
    for (let i = 0; i < STAGES.length; i++) {
        taskStages.push(
            <TaskStage name={STAGES[i]} stageNumber={i} />
        );
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Container component="main" maxWidth="lg" sx={{ mb: 2 }}>
                {detailsModalToggle && <TaskDetailModal />}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        mb: 2
                    }}
                >
                    <ListIcon sx={{ mr: 1 }} style={theme.styles.iconPrimary} />
                    <Typography
                        variant="h6"
                        color="primary"
                        component="div"
                    >
                        {taskboard.name}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        mb: 2,
                        overflowX: "auto",
                    }}
                >
                    {taskStages}
                </Box>
            </Container>
        </DndProvider>
    )
}

export default Taskboard;