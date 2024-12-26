import { Team } from "@/types/Team";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  teams: Team[];
};

const initialState: InitialState = {
  teams: [],
};

export const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeams: (state, action) => {
      const teams = action.payload;
      state.teams = teams;
    },
  },
});

export const { setTeams } = teamSlice.actions;
