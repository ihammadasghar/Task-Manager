import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { uiActions } from '../../store/ui/slice';
import { addTask } from "../../store/tasks/actions";

import { Paper, InputBase, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const NewTaskField = ({ stageNumber }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const taskFormValue = useSelector((state) => state.ui.taskForm[`stage${stageNumber}`]);
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "taskForm", field: field, value: value }));
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTask(taskFormValue, stageNumber));
        handleChange(`stage${stageNumber}`, "");
    }
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                bgcolor: "onBackground.textField",
            }}
            onSubmit={handleSubmit}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, color: "onBackground.main" }}
                placeholder="Type a new task"
                value={taskFormValue}
                onChange={(e) => handleChange(`stage${stageNumber}`, e.target.value)}
                inputProps={{ 'aria-label': 'type a new task' }}
            />
            <IconButton
                type="submit"
                sx={{ p: 2 }}
                aria-label="add"
            >
                <AddIcon
                    style={{ fill: theme.palette.onBackground.main }}
                />
            </IconButton>
        </Paper>
    )
}

export default NewTaskField;