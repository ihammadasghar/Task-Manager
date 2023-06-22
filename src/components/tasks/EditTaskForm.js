import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../store/tasks/actions";
import { uiActions } from "../../store/ui/slice";
import { useTheme } from "@emotion/react";

import { Paper, InputBase, Card, CardContent, CardActionArea, CardActions, Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

const EditTaskForm = ({ task }) => {
    const { id, stage, taskboard_id } = task;
    const dispatch = useDispatch();
    const taskForm = useSelector((state) => state.ui.editTaskForm);
    const theme = useTheme();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(uiActions.setState({ name: "editTaskView", value: false }));
        dispatch(
            editTask(
                {
                    id,
                    header: taskForm.header,
                    description: taskForm.description,
                    stage,
                    taskboard_id
                }
            )
        );
    }
    const handleChange = (field, value) => dispatch(uiActions.setFormValue({ form: "editTaskForm", field, value }));

    return (
        <Card
            sx={{
                bgcolor: 'onBackground.box'
            }}
            component="form"
            onSubmit={handleSubmit}
        >
            <CardActionArea>
                <CardContent>
                    <Paper
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            mb: 2,
                            bgcolor: "onBackground.textField"
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, color: "onBackground.main" }}
                            placeholder="header"
                            value={taskForm.header}
                            onChange={(e) => handleChange("header", e.target.value)}
                            inputProps={{ 'aria-label': "header" }}
                        />
                    </Paper>
                    <Paper
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: "100%",
                            mb: 2,
                            bgcolor: "onBackground.textField"
                        }}
                    >
                        <InputBase
                            sx={{
                                ml: 1,
                                flex: 1,
                                color: "onBackground.main",
                            }}
                            placeholder="description"
                            value={taskForm.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            inputProps={{ 'aria-label': "description" }}
                            minRows={5}
                            multiline
                        />
                    </Paper>
                </CardContent>
            </CardActionArea>
            <Button
                sx={{
                    width: "100%",
                }}
                color="onBackground"
                type="submit"
            >
                <SaveIcon style={theme.styles.iconOnBackground} />
                Save
            </Button>
            <CardActions>
            </CardActions>

        </Card>

    )
}

export default EditTaskForm;