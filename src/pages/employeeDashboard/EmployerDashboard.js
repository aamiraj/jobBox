import React from "react";
import PostedJobs from "../../components/reusable/PostedJobs";
import { useGetJobsByEmployerQuery } from "../../apis/jobApi";
import { useSelector } from "react-redux";
import Loading from "../../components/reusable/Loading";

const EmployerDashboard = () => {
  const { email } = useSelector((state) => state.auth.user);
  //console.log(email);
  const { data, isLoading } = useGetJobsByEmployerQuery(email);
  //console.log(data);
  if (isLoading) {
    <Loading />;
  }
  return (
    <div>
      <div className="m-8">
        <h1 className="text-primary p-4 text-3xl font-bold">Manage Jobs Here</h1>
      </div>
      <div className="grid grid-cols-1 gap-2 m-8">
        {data?.data?.map((jobData, i) => (
          <PostedJobs key={i} jobData={jobData} />
        ))}
      </div>
    </div>
  );
};

export default EmployerDashboard;
