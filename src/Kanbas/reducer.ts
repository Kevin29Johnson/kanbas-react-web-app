import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
    enrollments: enrollments || [], // Initializing with provided enrollments data or an empty array
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
            console.log("Enrolled:", newEnrollment); // Log each enrollment
        },
        unenroll(state, action) {
            state.enrollments = state.enrollments.filter(
                (enrollment) =>!(enrollment.user ===action.payload.user && enrollment.course === action.payload.course)
            );
            console.log("Unenrolled:", action.payload); // Log each unenrollment
        },
    },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
