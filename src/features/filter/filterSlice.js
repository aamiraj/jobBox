import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "newest", //oldest
  approvalState: "all" //pending | rejected | approved
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterByDate: (state, action) => {
      state.sort = action.payload;
    },
    filterByApprovalState: (state, action) => {
      state.approvalState = action.payload;
    },
  },
});

export const { filterByDate, filterByApprovalState } = filterSlice.actions;

export default filterSlice.reducer;
