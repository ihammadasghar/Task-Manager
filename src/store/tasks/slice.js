import { createSlice } from "@reduxjs/toolkit";

export const STAGES = ["Backlog", "Todo", "In Progress", "Completed"];

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
    loadedTaskboardId: null,
    choosenTaskboardId: null,
    detailViewTaskId: null,
    draggedTaskId: null,
    taskComments: [],
    latestUpdateTime: null,
    lastFetchLatestUpdateTime: null,
    lastTaskFetchDt: new Date(0),
  },
  reducers: {
    toggle(state, action) {
      state[action.payload] = !state[action.payload];
    },
    setState(state, action) {
      state[action.payload.stateName] = action.payload.value;
    },
    replaceTaskList(state, action) {
      state.allTasks = action.payload.data;
      state.allTasks = state.allTasks.map((task) => {
        return { ...task, stage: Number(task.stage) }
      });
      state.lastTaskFetchDt = new Date();

      state.lastFetchLatestUpdateTime = state.latestUpdateTime;

      if (state.allTasks.length !== 0) {
        state.latestUpdateTime = state.allTasks[0].updatedAt;
        state.allTasks.forEach((task) => {
          if (task.updatedAt > state.latestUpdateTime) {
            state.latestUpdateTime = task.updatedAt;
          }
        });
      }

      state.loadedTaskboardId = state.choosenTaskboardId;
      console.log("Last Task Fetch:", state.lastTaskFetchDt);
    }
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice;