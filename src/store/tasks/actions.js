import { taskActions } from "./slice";
import { fetchPost } from "../../utils/api";
import store from '../../store';
import { TASK_INTERVAL } from "../../utils/constants";

const getTaskList = (lastTaskFetchDt, taskboardChanged) => {
  return async (dispatch) => {
    if (((new Date()) - lastTaskFetchDt) > TASK_INTERVAL || taskboardChanged) {
      const state = store.getState();
      const inputData = {
        appuser: state.auth.user.name,
        apppassword: state.auth.user.password,
        taskboard_id: state.tasks.choosenTaskboardId
      }

      if (state.tasks.latestUpdateTime) {
        inputData["latestUpdateTime"] = state.tasks.latestUpdateTime;
      }

      try {
        const response = await fetchPost('/api/app-tasks-list.php', inputData);
        dispatch(taskActions.replaceTaskList(response));
      } catch (err) { console.log("ERROR_FETCHING_TASKS"); }
    }
  };
};

const editTask = (editedTask, returnList = 1) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      appuser: state.auth.user.name,
      apppassword: state.auth.user.password,
      taskId: editedTask.id,
      taskboard_id: editedTask.taskboard_id,
      header: editedTask.header,
      description: editedTask.description,
      stage: editedTask.stage,
      returnList: returnList
    }

    try {
      const response = await fetchPost('/api/app-tasks-edit.php', inputData);
      if (returnList === 1 && response?.success) {
        dispatch(taskActions.replaceTaskList(response));
      }
    } catch (err) { console.log("ERROR_EDITING_TASK"); }

  };
};

const addTask = (header, stage, returnList = 1) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      appuser: state.auth.user.name,
      apppassword: state.auth.user.password,
      header,
      stage,
      taskboard_id: state.tasks.choosenTaskboardId,
      returnList
    }
    try {
      const response = await fetchPost('/api/app-tasks-add.php', inputData);
      if (returnList === 1 && response?.success) {
        dispatch(taskActions.replaceTaskList(response));
      }
    } catch (err) { console.log("ERROR_ADDING_TASK"); }

  };
};

const getTaskComments = () => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      appuser: state.auth.user.name,
      apppassword: state.auth.user.password,
      task_id: state.tasks.detailViewTaskId
    }

    try {
      const response = await fetchPost('/api/app-taskmsgs.php', inputData);
      if (response.success) {
        dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

const addTaskComment = (msg, returnList = 1) => {
  return async (dispatch) => {
    const state = store.getState();
    const inputData = {
      appuser: state.auth.user.name,
      apppassword: state.auth.user.password,
      task_id: state.tasks.detailViewTaskId,
      msg,
      returnList
    }

    try {
      const response = await fetchPost('/api/app-taskmsg-add.php', inputData);
      if (response.success) {
        dispatch(taskActions.setState({ stateName: "taskComments", value: response.data }));
      }
    }
    catch (err) {
      if (process.env.REACT_APP_ENV === "DEV") {
        console.log(err);
      }
    }
  };
};

export { getTaskList, editTask, addTask, getTaskComments, addTaskComment };
