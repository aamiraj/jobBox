import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const email = useSelector((state) => state.auth.user.email);
  const navigate = useNavigate();
  const {
    _id,
    position,
    companyName,
    location,
    employmentType,
    applicants,
    postDate,
  } = jobData || {};
  const postedDate = new Date(postDate).toLocaleDateString();

  // const appliedStatus = applicants?.map(
  //   (applicant) => applicant.email === email
  // );

  const candidate = applicants?.find((applicant) => {
    return applicant.email === email;
  });

  //console.log(candidate);

  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <div>
          <p className="text-xl">{position}</p>
          <small className="text-primary/70 ">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
        {candidate ? <p>Applied</p> : <p></p>}
        {candidate && <p>{candidate?.approvalStatus?.toUpperCase()}</p>}
      </div>
      <div className="flex justify-between items-center mt-5">
        <p>{employmentType}</p>
        <p>Posted: {postedDate}</p>
        <button className="btn" onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
