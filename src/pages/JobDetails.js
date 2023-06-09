import React, { useState } from "react";
import meeting from "../assets/meeting.jpg";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";
import {
  useApplyToJobMutation,
  useGetJobDetailsQuery,
  usePostQueryMutation,
  usePostReplyMutation,
} from "../apis/jobApi";
import Loading from "../components/reusable/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const JobDetails = () => {
  const [qandaData, setQandaData] = useState({});
  const role = useSelector((state) => state.auth.user?.role);
  const userId = useSelector((state) => state.auth.user?._id);
  const email = useSelector((state) => state.auth.user?.email);
  const { id } = useParams();
  const navigate = useNavigate()
  // console.log(id)
  const { data, isLoading } = useGetJobDetailsQuery(id, {
    pollingInterval: 3000,
  });
  const [applyToJob, { isLoading: isLoading2 }] = useApplyToJobMutation();
  const [postQuery] = usePostQueryMutation();
  const [postReply] = usePostReplyMutation();
  // console.log(data, isLoading);
  const {
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
    queries,
    applicants,
    employer,
    _id,
  } = data?.data || {};

  const candidate = applicants?.find((applicant) => applicant.email === email);

  const handleApply = () => {
    if (role === "candidate") {
      const data = { userId: userId, jobId: _id, email: email, approvalStatus: "pending" };
      //console.log(data);
      applyToJob(data)
        .then((res) => {
          //console.log(res)
          if (res.data.status) {
            toast.success("Successfully applied for this job.");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("You need a candidate account to apply for this job.");
    }
  };

  if (isLoading || isLoading2) {
    return <Loading />;
  }

  const handleQuery = () => {
    if (role === "candidate") {
      const queryData = { ...qandaData, jobId: _id, userId, email };
      //console.log(queryData);
      postQuery(queryData)
        .then((res) => {
          //console.log(res)
          if (res.data.status) {
            toast.success("Please be petient, the employer will respond soon.");
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("You need a candidate account to ask question.");
    }
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setQandaData({ [e.target.name]: e.target.value });
    //console.log(qandaData);
  };

  const handleReply = (id) => {
    //console.log(qandaData);
    if (role === "employer") {
      const replyData = { ...qandaData, userId: id };
      //console.log(replyData);
      postReply(replyData)
        .then((res) => {
          //console.log(res)
          if (res.data.status) {
            toast.success("You replied successfully.");
            setQandaData({});
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((error) => console.log(error));
    } else {
    }
  };

  return (
    <div className="pt-14 grid grid-cols-12 gap-5">
      <div className="col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            {
              candidate?.email && <button className="btn" type="button" onClick={()=>navigate(`/dashboard/chat-room/${employer.id}`)}>Chat with HM</button>
            }
            <button
              type="button"
              onClick={handleApply}
              className="btn"
              disabled={candidate?.email ? true : false}
            >
              {candidate?.email ? "Applied" : "Apply"}
            </button>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills.map((skill, i) => (
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
              {requirements.map((skill, i) => (
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
              {responsibilities.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>
            <div className="text-primary my-2">
              {queries?.map(({ question, email, reply, id }, i) => (
                <div key={i}>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {role === "employer" && (
                    <div className="flex gap-3 my-5">
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                        name="reply"
                        onBlur={handleBlur}
                      />
                      <button
                        className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                        type="button"
                        onClick={() => handleReply(id)}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {role === "candidate" && (
              <div className="flex gap-3 my-5">
                <input
                  placeholder="Ask a question..."
                  type="text"
                  className="w-full"
                  name="question"
                  onBlur={handleBlur}
                />
                <button
                  className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                  type="button"
                  onClick={handleQuery}
                >
                  <BsArrowRightShort size={30} />
                </button>
              </div>
            )}
          </div>
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
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
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

export default JobDetails;
