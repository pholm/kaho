import { createSlice } from '@reduxjs/toolkit';

const dateSlice = createSlice({
    name: 'dates',
    initialState: {
        startDate: new Date(),
        endDate: new Date(),
        datesSet: false,
    },
    reducers: {
        setStartDate: (state, action) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
        },
        datesSet: (state, action) => {
            state.datesSet = action.payload;
        },
        initializeDates: (state) => {
            state.startDate = new Date();
            state.endDate = new Date();
            state.datesSet = false;
        },
    },
});

export const dateReducer = dateSlice.reducer;

export const { setStartDate, setEndDate, datesSet, initializeDates } =
    dateSlice.actions;
