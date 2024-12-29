import { api } from "../api/api";

export const fileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createFile: builder.mutation({
      query: (data) => ({
        url: `/api/v1/file/file-create`,
        method: "POST",
        body: data, // Send the data object directly
      }),
      invalidatesTags: ["files"],
    }),
    getTeamFiles: builder.query({
      query: (teamId) => ({
        url: `/api/v1/file/get-teams-file/${teamId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["files"],
    }),
  }),
});

export const {
  useCreateFileMutation,
  useLazyGetTeamFilesQuery,
  useGetTeamFilesQuery,
} = fileApi;
