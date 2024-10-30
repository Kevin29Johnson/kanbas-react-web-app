import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer
  },
});
export default store;

