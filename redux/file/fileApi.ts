import { api } from "../api/api";
import { setDocument } from "./flieSlice";

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
    updateFile: builder.mutation({
      query: ({ id, data }) => {
        console.log("data", data);
        return {
          url: `/api/v1/file/update-file/${id}`,
          method: "PATCH",
          body: data,
          credentials: "include" as const,
          headers: {
            "Content-Type": "application/json", // Ensure JSON content type
          },
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setDocument(result.data.document));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
    getIndividualFileData: builder.query({
      query: (fileId) => ({
        url: `/api/v1/file/get-individual-file-data/${fileId}`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(setDocument(result.data.file.document));
        } catch (error: any) {
          console.log("updated errir");
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useCreateFileMutation,
  useLazyGetTeamFilesQuery,
  useGetTeamFilesQuery,
  useUpdateFileMutation,
  useGetIndividualFileDataQuery,
  useLazyGetIndividualFileDataQuery,
} = fileApi;
