import { Team } from "@/types/Team";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  teams: Team[];
  activeTeam: Team | null; // Assuming activeTeam can be null
};

const initialState: InitialState = {
  teams: [],
  activeTeam: null, // Initial value
};

export const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload; // Assuming payload is a Team[]
    },
    setActiveTeam: (state, action) => {
      state.activeTeam = action.payload; // Assuming payload is a Team
    },
  },
});

export const { setTeams, setActiveTeam } = teamSlice.actions;
export default teamSlice.reducer;
