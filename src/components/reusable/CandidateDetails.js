import React from "react";
import {
  useGetCandidateDetailsQuery,
  useUpdateApprovalStatusMutation,
} from "../../apis/jobApi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { FaAngleDoubleLeft } from "react-icons/fa";

const CandidateDetails = () => {
  const { id } = useParams();
  const [jobId, userId] = id.split("+");
  //console.log(id, userId, jobId)
  const { data, isLoading } = useGetCandidateDetailsQuery(userId);
  const navigate = useNavigate();
  const [updateApprovalStatus] = useUpdateApprovalStatusMutation();

  if (isLoading) {
    return <Loading />;
  }

  const {
    firstName,
    lastName,
    email,
    gender,
    address,
    city,
    country,
    postcode,
  } = data?.data || {};

  const handleApprovalStatus = (status) => {
    updateApprovalStatus({ id: userId, data: { approvalStatus: status, jobId: jobId } });
  };

  return (
    <div className="m-4 p-4">
      <div>
        <button type="button" onClick={() => navigate(-1)}>
          <FaAngleDoubleLeft className="text-primary text-3xl" />
        </button>
      </div>
      <div>
        <h1 className="text-primary text-4xl font-bold py-4">
          Candidate Details
        </h1>
        <div>
          <button
            onClick={() => handleApprovalStatus("approved")}
            className="btn-success m-4"
          >
            Approve
          </button>
          <button
            onClick={() => handleApprovalStatus("rejected")}
            className="btn-error m-4"
          >
            Reject
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <p>Name:</p>
          <p>Email:</p>
          <p>Gender:</p>
          <p>Address:</p>
        </div>
        <div>
          <p>{firstName + " " + lastName}</p>
          <p>{email}</p>
          <p>{gender.toUpperCase()}</p>
          <p>
            {address.toUpperCase() +
              ", " +
              city.toUpperCase() +
              "-" +
              postcode +
              ", " +
              country.toUpperCase() +
              "."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
