import { createSlice } from "@reduxjs/toolkit";
import { IInitialGroups, Status } from "./types";
import { getGroups } from "./asyncActions";

const initialState: IInitialGroups = {
  groups: {
    result: 0,
    data: [],
  },
  searchGroups: [],
  status: "idle",
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      action.payload?.data ? (state.groups = action.payload) : "";
      state.status = Status.COMPLETED;
    }),
      builder.addCase(getGroups.pending, (state) => {
        state.status = Status.LOADING;
      }),
      builder.addCase(getGroups.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default groupSlice.reducer;
