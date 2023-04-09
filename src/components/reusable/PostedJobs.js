import React from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateJobStatusMutation } from "../../apis/jobApi";

const PostedJobs = ({ jobData }) => {
  const navigate = useNavigate();
  const { _id, position, applicants, status } = jobData || {};
  const [updateStatus] = useUpdateJobStatusMutation();
  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <p className="text-xl">{position}</p>
        <p>
          Number of Applicants: {applicants?.length ? applicants?.length : 0}
        </p>
        <p>Job Status: {status?.toUpperCase()}</p>
      </div>
      <div className="flex space-x-4 items-center mt-5">
        <button className="btn" onClick={() => navigate(`/dashboard/job-details/${_id}`)}>
          Details
        </button>
        <button
          className="btn-error"
          onClick={() => updateStatus(_id)}
          disabled={status === "closed" ? true : false}
        >
          Close Position
        </button>
      </div>
    </div>
  );
};

export default PostedJobs;
