import { api } from "../api/api";
import { setTeams } from "./teamSlice";

export const teamApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        url: `/api/v1/team/create-team`,
        method: "POST",
        body: data, // Send the data object directly
      }),
      invalidatesTags: ["teams"],
    }),
    findAllTeams: builder.query<any, void>({
      query: () => ({
        url: `/api/v1/team/my-teams`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["teams"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          //console.log("myWorkspaces", result.data.myWorkspaces);
          //console.log("result", result);
          dispatch(setTeams(result.data.myTeams));
        } catch (error) {}
      },
    }),
  }),
});

export const { useCreateTeamMutation, useFindAllTeamsQuery } = teamApi;
