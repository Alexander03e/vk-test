import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IFilters {
  colorFilter: Array<string>;
  uniqColorFilters: Array<string>;
  privacyFilter: "all" | boolean;
  friendsFilter: "all" | boolean;
}

const initialState: IFilters = {
  uniqColorFilters: [],
  colorFilter: [],
  privacyFilter: "all",
  friendsFilter: "all",
};

export const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    addColorFilters(state, action: PayloadAction<Array<string>>) {
      state.colorFilter = action.payload;
    },
    addPrivacyFilters(state, action) {
      action.payload ? (state.privacyFilter = action.payload) : "";
    },
    addFriendsFilter(state, action) {
      action.payload ? (state.friendsFilter = action.payload) : "";
    },
    addUniqColors(state, action) {
      state.uniqColorFilters = action.payload;
    },
  },
});

export const {
  addUniqColors,
  addColorFilters,
  addPrivacyFilters,
  addFriendsFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
