import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
    enrollments: enrollments || [], 
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        enroll(state, action) {
            const newEnrollment = {
                _id: Date.now().toString(),
                user: action.payload.user,
                course: action.payload.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment];
        },
        unenroll(state, action) {
            state.enrollments = state.enrollments.filter(
                (enrollment) =>!(enrollment.user ===action.payload.user && enrollment.course === action.payload.course)
            );
        },
    },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
