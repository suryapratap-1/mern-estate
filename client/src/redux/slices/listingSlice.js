import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    propertyList : [],
    loading : false,
    error : null,
};

const listingSlice = createSlice({
    name: 'propertyList',
    initialState,
    reducers: {
        fetchListingStart: (state) => {
            state.loading = true
        },
        fetchListingSuccess: (state, action) => {
            state.propertyList = action.payload,
            state.loading = false,
            state.error = null
        },
        fetchPropertyFailure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const { fetchListingStart, fetchListingSuccess, fetchPropertyFailure } = listingSlice.actions;

export default listingSlice.reducer;