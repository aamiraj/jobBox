import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const role = useSelector((state) => state.auth.user?.role);
  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaHome className="mx-2"/>
            <h1>Home</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        {role === "employer" && (
          <>
            <li>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to="add-job"
              >
                Add Job
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                to="employer"
              >
                Manage Jobs
              </Link>
            </li>
          </>
        )}
        {role === "candidate" && (
          <li>
            <Link
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
              to="applied-jobs"
            >
              Applied Jobs
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
