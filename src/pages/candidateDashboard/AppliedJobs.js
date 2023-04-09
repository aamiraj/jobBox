import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../apis/jobApi";
import { useDispatch } from "react-redux";
import {
  filterByApprovalState,
  filterByDate,
} from "../../features/filter/filterSlice";
import sortByDate from "../../utils/sortFunction";

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email, {pollingInterval: 10000});

  if (isLoading) {
    return <Loading />;
  }

  const jobs = [...data.data];

  let filteredJobs;

  if (filter.sort === "oldest") {
    filteredJobs = jobs
      ?.sort((array1, array2) => sortByDate(array1, array2))
      .filter((job) => {
        if (filter.approvalState !== "all") {
          const candidate = job.applicants.find(
            (applicant) => applicant.email === email
          );
          return candidate.approvalStatus === filter.approvalState;
        }
        return job;
      });
  } else {
    filteredJobs = jobs
      ?.sort((array1, array2) => sortByDate(array2, array1))
      .filter((job) => {
        if (filter.approvalState !== "all") {
          const candidate = job.applicants.find(
            (applicant) => applicant.email === email
          );
          return candidate.approvalStatus === filter.approvalState;
        }
        return job;
      });
  }

  return (
    <div className="p-8">
      <h1 className="text-primary font-bold text-3xl p-8">
        Applied jobs for {email}
      </h1>
      <div className="my-8">
        <label>Sort by: </label>
        <select
          className="mx-8"
          onChange={(e) => dispatch(filterByDate(e.target.value))}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <label>Status: </label>
        <select
          className="mx-8"
          onChange={(e) => dispatch(filterByApprovalState(e.target.value))}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5 pb-5">
        {filteredJobs?.map((job, i) => (
          <JobCard key={i} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
