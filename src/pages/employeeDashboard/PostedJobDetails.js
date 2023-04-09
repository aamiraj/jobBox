import React from "react";
import {
  useGetJobDetailsQuery,
  useUpdateJobStatusMutation,
} from "../../apis/jobApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/reusable/Loading";
import { BsArrowRightShort } from "react-icons/bs";
import { FcViewDetails, FcComments } from "react-icons/fc";
import { FaAngleDoubleLeft } from "react-icons/fa";
const PostedJobDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetJobDetailsQuery(id, {
    pollingInterval: 3000,
  });
  const [updateStatus] = useUpdateJobStatusMutation();

  const navigate = useNavigate();

  const {
    status,
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    applicants,
    _id,
  } = data?.data || {};

  if (isLoading) {
    return <Loading />;
  }
  //console.log(data);
  return (
    <div className="p-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="space-y-5">
          <div>
            <button className="flex" type="button" onClick={()=>navigate("/dashboard/employer")}>
              <FaAngleDoubleLeft className="text-primary text-3xl" />
              <span className="text-2xl text-primary font-bold mx-2">Manage Jobs</span>
            </button>
          </div>
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            <button
              type="button"
              onClick={() => updateStatus(_id)}
              className="btn-error"
              disabled={status === "closed" ? true : false}
            >
              Close Position
            </button>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <h1 className="text-primary text-lg font-medium mb-3">
            Number of Applicants: {applicants?.length ? applicants?.length : 0}
          </h1>
          <h1 className="text-primary text-lg font-medium mb-3">
            List of Applicants:
          </h1>
          {applicants?.length ? (
            <div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th>Sl no.</th>
                    <th>Name/Email</th>
                    <th>See Details</th>
                    <th>Chat</th>
                    <th>Approval Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants?.map((applicant, i) => (
                    <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>{applicant.email}</td>
                      <td>
                        <Link
                          to={`/dashboard/candidate-details/${_id}+${applicant.id}`}
                        >
                          <FcViewDetails className="text-2xl" />
                        </Link>
                      </td>
                      <td>
                        <button onClick={() => navigate(`/dashboard/chat-room/${applicant.id}`)}>
                          <FcComments className="text-2xl" />
                        </button>
                      </td>
                      <td>{applicant?.approvalStatus.toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-gray-400">
              No one applied for this job position yet.
            </p>
          )}
        </div>
      </div>
      <div className="col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-md">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <Link className="font-semibold text-lg" href="#">
              https://website.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedJobDetails;
