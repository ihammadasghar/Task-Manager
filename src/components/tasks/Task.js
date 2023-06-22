import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../../store/tasks/slice";
import { dragItemTypes } from "../../utils/constants";
import { useDrag } from 'react-dnd'

import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Typography } from "@mui/material";

const Task = ({ task }) => {
    const { id, header, createdBy, createdAt, updatedBy, updatedAt } = task;
    const dispatch = useDispatch();
    const lastFetchLatestUpdateTime = useSelector((state) => state.tasks.lastFetchLatestUpdateTime);
    const isNewlyUpdated = updatedAt > lastFetchLatestUpdateTime;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: dragItemTypes.TASK,
        item: { itemId: id },
        collect: monitor => ({
            item: monitor.getItem(),
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const viewDetails = () => {
        dispatch(taskActions.setState({ stateName: "detailViewTaskId", value: id }))
        dispatch(taskActions.toggle("detailsModal"));
    }
    return (
        <Card
            ref={drag}
            sx={{
                display: isDragging ? "none" : "visible",
                width: "100%",
                bgcolor: "onBackground.box",
                cursor: 'move',
                border: isNewlyUpdated ? 1 : 0,
                borderColor: "white"
            }}
        >
            <CardContent onClick={viewDetails}>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Typography color="onBackground.main" component="div">
                            {header}
                        </Typography>
                    </Grid>
                    <Grid xs={12}>

                        {isNewlyUpdated ?
                            <Typography component="b" variant="p" color="onBackground.main">
                                Last updated by {updatedBy}, {updatedAt}
                            </Typography>
                            :
                            <Typography component="p" variant="p" color="onBackground.dim">
                                Created by {createdBy} at {createdAt}
                            </Typography>
                        }

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Task;