import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null,
            state.error = null,
            state.loading = false
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null,
            state.error = null,
            state.loading = false
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
});

export const { 
    signInStart, signInSuccess, signInFailure, signOutSuccess,
    deleteUserSuccess, deleteUserFailure,
    updateUserSuccess, updateUserFailure
} = userSlice.actions;
export default userSlice.reducer;