import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://job-box-server-git-main-aamiraj.vercel.app/" }),
  tagTypes: ["Jobs", "AppliedJobs", "JobDetails", "JobsByEmployer", "Chats"],
  endpoints: (builder) => ({
    addJob: builder.mutation({
      query(data) {
        return {
          url: "job",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Jobs"],
    }),
    getJobs: builder.query({
      query() {
        return {
          url: "jobs",
        };
      },
      providesTags: ["Jobs"],
    }),
    getJobDetails: builder.query({
      query: (id) => `job/${id}`,
      providesTags: ["JobDetails"],
    }),
    applyToJob: builder.mutation({
      query(data) {
        return {
          url: "apply",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Jobs", "AppliedJobs"],
    }),
    getAppliedJobs: builder.query({
      query(email) {
        return {
          url: `/applied-jobs/${email}`,
        };
      },
      providesTags: ["AppliedJobs"],
    }),
    postQuery: builder.mutation({
      query(data) {
        return {
          url: "/query",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["JobDetails"],
    }),
    postReply: builder.mutation({
      query(data) {
        return {
          url: "/reply",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["JobDetails"],
    }),
    // Assignment starts from here
    getJobsByEmployer: builder.query({
      query(email) {
        return {
          url: `/jobsByEmployer/${email}`,
        };
      },
      providesTags: ["JobsByEmployer"],
    }),
    updateJobStatus: builder.mutation({
      query(id) {
        return {
          url: `updateJobStatus/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["JobsByEmployer"],
    }),
    getCandidateDetails: builder.query({
      query(id) {
        return {
          url: `candidate-details/${id}`,
        };
      },
    }),
    sendMessege: builder.mutation({
      query(data) {
        return {
          url: "messege",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Chats"],
    }),
    getMesseges: builder.query({
      query({ fromId: from, toId: to }) {
        return {
          url: `messege/${from}?to=${to}`,
        };
      },
      providesTags: ["Chats"],
    }),
    updateApprovalStatus: builder.mutation({
      query({id, data}){
        return {
          url: `updateApprovalStatus/${id}`,
          method: "PATCH",
          body: data
        }
      }
    })
  }),
});

export const {
  useAddJobMutation,
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useApplyToJobMutation,
  useGetAppliedJobsQuery,
  usePostQueryMutation,
  usePostReplyMutation,
  useGetJobsByEmployerQuery,
  useUpdateJobStatusMutation,
  useGetCandidateDetailsQuery,
  useSendMessegeMutation,
  useGetMessegesQuery,
  useUpdateApprovalStatusMutation
} = jobApi;
